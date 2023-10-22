import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToggleButtonGroup, ToggleButton} from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from '../Context/UserContext';
import { QUESTIONS_URL } from '../Constants';

export default function Match({socket}) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState('Any');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [categoryList, setCategoryList] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${QUESTIONS_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        });
        const questions = await response.data.questions;
        const categories = new Set();

        for (const question of questions) {
          const categoryList = question['category'].split(",");
          categoryList.forEach(cat => categories.add(cat));
        }
        setCategoryList([...categories]);
        console.log("Successfully fetched the question categories");
      } catch (error) {
        console.log("Unable to fetch the question categories");
      }
    }

    getCategories()
  }, [])


  const matchUser = () => {
    // Remove all existing toasts to prevent toasts from stacking up
    toast.dismiss();

    if (difficulty == null) {
      toast.error("Please select a difficulty level", { isLoading: false, autoClose: 3000 });
      return;
    }

    setIsButtonDisabled(true);
    socket.emit("matchUser", {user, difficulty, category});

    const toastMessage = toast("Please wait for a moment while we try to match you with another user", {
      type: 'info', isLoading: true, closeOnClick: false
    });

    socket.on("matched", (arg) => {
      toast.update(toastMessage, { render: "You have been successfully matched with another user!", 
      type: "success", isLoading: false, closeOnClick: true });

      // Redirects the user to the collab page
      const navigateToCollab = () => navigate(`/collab/${arg}`, { replace: true });
      setTimeout(navigateToCollab, 1500);
    });

    socket.on("timeout", () => {
      toast.update(toastMessage, { render: "Sorry we are unable to match you with a user. Please retry matching again!", 
      type: "error", isLoading: false, autoClose: 3000, closeOnClick: true });
      setIsButtonDisabled(false);
    });

    socket.on("already_matched", (arg) => {
      toast.update(toastMessage, { render: "You already have an existing session! Please terminate the session before matching again.", 
      type: "error", isLoading: false, closeOnClick: true });
      
      // Redirects the user to the collab page
      const navigateToCollab = () => navigate(`/collab/${arg}`, { replace: true });
      setTimeout(navigateToCollab, 1500);
    });

    socket.on("not_found", () => {
      toast.update(toastMessage, { render: "Sorry we cannot find a question with your chosen category and difficulty. Please choose another combination!", 
      type: "error", isLoading: false, autoClose: 3000, closeOnClick: true });
      setIsButtonDisabled(false);
    });

    socket.on("already_requested", () => {
      toast.update(toastMessage, { render: "You already have an active request! Please wait for the result of the request on this tab and close the other tabs.", 
      type: "error", isLoading: false, closeOnClick: false });
      const nextUpdate = () => toast.update(toastMessage, { render: "Please wait for a moment while we try to match you with another user",
      type: "info", isLoading: true, closeOnClick: false });
      setTimeout(nextUpdate, 3000);
    });
  }

  return (
    <div className="m-auto shadow-[0_1px_2px_0px_rgba(0,0,0,0.5)] mb-5 border-transparent rounded w-6/12 p-2 flex flex-col items-center gap-4">
        <ToastContainer position='top-center' theme='colored' hideProgressBar={true} draggable={false} 
        closeButton={false} />
        <div>Please select a category</div>
        <select className="w-1/2 rounded border border-blue-500 text-base py-3 px-4" onChange={(event) => {
          setCategory(event.target.value);
        }}>
          <option value='Any'>Any</option>
          {categoryList !== null && categoryList.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))
          }
        </select>
        <div>Please select a difficulty</div>
        <ToggleButtonGroup 
        color="primary" value={difficulty} exclusive onChange={(event, difficulty) => {
          setDifficulty(difficulty);
        }}>
          <ToggleButton value="Easy">Easy</ToggleButton>
          <ToggleButton value="Medium">Medium</ToggleButton>
          <ToggleButton value="Hard">Hard</ToggleButton>
        </ToggleButtonGroup>
        <Button variant='contained' onClick={matchUser} disabled={isButtonDisabled}>Match</Button>
    </div>
  );
}