import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext";
import { QUESTIONS_URL } from "../../Constants";

export default function Match({ socket }) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState("Any");
  const [tag, setTag] = useState("Any");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [tagList, setTagList] = useState(null);
  const pendingToast = useRef({});

  useEffect(() => {
    const getCategoriesAndTags = async () => {
      try {
        const response = await axios.get(`${QUESTIONS_URL}/categories`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        });
        const questions = await response.data.questions;
        const categories = new Set();
        const tags = new Set();

        for (const question of questions) {
          const categoryList = question["category"].split(",");
          categoryList.forEach((cat) => categories.add(cat));

          const tagList = question["tags"];
          tagList.forEach((tag) => tags.add(tag.name));
        }
        setCategoryList([...categories]);
        setTagList([...tags]);
        console.log("Successfully fetched the question categories and tags");
      } catch (error) {
        console.log("Unable to fetch the question categories and tags");
      }
    };

    getCategoriesAndTags();

    const handleVisibilityChange = () => {
      if (isPageVisible()) {
        if (Object.keys(pendingToast.current).length !== 0) {
          let temp = pendingToast.current;
          pendingToast.current = {};
          // The page has become visible, and there is a pending toast message
          updateToast(temp.id, temp.options);
        }
      }
    };

    // Add an event listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const isPageVisible = () => {
    return !document.hidden;
  };

  const updateToast = (id, options) => {
    if (isPageVisible()) {
      toast.update(id, options);
    } else {
      pendingToast.current = { id: id, options: options };
    }
  };

  const matchUser = () => {
    // Remove all existing toasts to prevent toasts from stacking up
    toast.dismiss();

    if (difficulty == null) {
      toast.error("Please select a difficulty level", {
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    setIsButtonDisabled(true);
    socket.emit("matchUser", { user, difficulty, category, tag });

    let timer = 0;

    const toastMessage = toast(
      "Please wait for a moment while we try to match you with another user",
      {
        type: "info",
        isLoading: true,
        closeOnClick: false,
        render: `Please wait for a moment while we try to match you with another user (0s)`, // Initial message
      }
    );

    const updateToastMessage = () => {
      timer++; // Increment the timer
      updateToast(toastMessage, {
        render: `Please wait for a moment while we try to match you with another user (${timer}s)`,
      });
    };
    const timerInterval = setInterval(updateToastMessage, 1000);

    socket.on("matched", (arg) => {
      clearInterval(timerInterval);
      updateToast(toastMessage, {
        render: "You have been successfully matched with another user!",
        type: "success",
        isLoading: false,
        closeOnClick: true,
      });

      // Redirects the user to the collab page
      const navigateToCollab = () =>
        navigate(`/collab/${arg}`, { replace: true });
      setTimeout(navigateToCollab, 1500);
    });

    socket.on("timeout", () => {
      clearInterval(timerInterval);
      updateToast(toastMessage, {
        render:
          "Sorry we are unable to match you with a user. Please retry matching again!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      setIsButtonDisabled(false);
    });

    socket.on("already_matched", (arg) => {
      clearInterval(timerInterval);
      updateToast(toastMessage, {
        render:
          "You already have an existing session! Please terminate the session before matching again.",
        type: "error",
        isLoading: false,
        closeOnClick: true,
      });

      // Redirects the user to the collab page
      const navigateToCollab = () =>
        navigate(`/collab/${arg}`, { replace: true });
      setTimeout(navigateToCollab, 1500);
    });

    socket.on("not_found", () => {
      clearInterval(timerInterval);
      updateToast(toastMessage, {
        render:
          "Sorry we cannot find a question with your chosen category and difficulty. Please choose another combination!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      setIsButtonDisabled(false);
    });

    socket.on("already_requested", () => {
      clearInterval(timerInterval);
      updateToast(toastMessage, {
        render:
          "You already have an active request! Please wait for the result of the request on this tab and close the other tabs.",
        type: "error",
        isLoading: false,
        closeOnClick: false,
      });
      const nextUpdate = () =>
        updateToast(toastMessage, {
          render:
            "Please wait for a moment while we try to match you with another user",
          type: "info",
          isLoading: true,
          closeOnClick: false,
        });
      setTimeout(nextUpdate, 3000);
    });
  };

  return (
    <div className="shadow-[0_1px_2px_0px_rgba(0,0,0,0.5)] mb-5 border-transparent rounded w-6/12 p-2 flex flex-col items-center gap-4">
      <ToastContainer
        position="top-center"
        theme="colored"
        hideProgressBar={true}
        draggable={false}
        closeButton={false}
      />
      <div>Please select a category</div>
      <select
        className="w-1/2 rounded border border-blue-500 text-base py-3 px-4"
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      >
        <option value="Any">Any</option>
        {categoryList !== null &&
          categoryList.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
      </select>
      <div>Please select a tag</div>
      <select
        className="w-1/2 rounded border border-blue-500 text-base py-3 px-4"
        onChange={(event) => {
          setTag(event.target.value);
        }}
      >
        <option value="Any">Any</option>
        {tagList !== null &&
          tagList.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
      </select>
      <div>Please select a difficulty</div>
      <ToggleButtonGroup
        color="primary"
        value={difficulty}
        exclusive
        onChange={(event, difficulty) => {
          setDifficulty(difficulty);
        }}
      >
        <ToggleButton value="Easy">Easy</ToggleButton>
        <ToggleButton value="Medium">Medium</ToggleButton>
        <ToggleButton value="Hard">Hard</ToggleButton>
      </ToggleButtonGroup>
      <Button
        variant="contained"
        onClick={matchUser}
        disabled={isButtonDisabled}
      >
        Match
      </Button>
    </div>
  );
}
