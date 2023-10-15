import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToggleButtonGroup, ToggleButton} from '@mui/material';
import { UserContext } from '../Context/UserContext';

export default function Match({socket}) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState("Any");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  const matchUser = () => {
    // Remove all existing toasts to prevent toasts from stacking up
    toast.dismiss();

    if (difficulty == null) {
      toast.error("Please select a difficulty level", { draggable:false, isLoading: false, closeButton: false, closeOnClick: true });
      return;
    }

    setIsButtonDisabled(true);
    socket.emit("matchUser", {user, difficulty, category});

    const toastMessage = toast("Please wait for a moment while we try to match you with another user", {
      type: 'info', draggable:false, isLoading: true, closeButton: false, closeOnClick: false
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
      type: "error", isLoading: false, closeOnClick: true});
      setIsButtonDisabled(false);
    });
  }

  return (
    <div className="m-auto shadow-[0_1px_2px_0px_rgba(0,0,0,0.5)] mb-5 border-transparent rounded w-6/12 p-2 flex flex-col items-center gap-4">
        <ToastContainer position='top-center' theme='colored' hideProgressBar="true" />
        <div>Please select a category</div>
        <select className="w-1/2 rounded border border-blue-500 text-base py-3 px-4" onChange={(event) => {
          setCategory(event.target.value);
        }}>
          <option value='Any'>Any</option>
          <option value='Dynamic Programming'>Dynamic Programming</option>
          <option value='Tree'>Tree</option>
          <option value='Graph'>Graph</option>
          <option value='Array'>Array</option>
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