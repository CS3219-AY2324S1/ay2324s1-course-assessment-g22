import React, {useContext, useEffect, useState} from 'react';
import styles from './Match.module.css'
// import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { ToggleButtonGroup, ToggleButton} from '@mui/material';
import { UserContext } from '../Context/UserContext';

export default function Match({socket}) {
  // const navigate = useNavigate();
  const user = useContext(UserContext);
  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState("Any");
  // useContext(UserContext).then(username => setUsername(username));

  const matchUser = () => {

    socket.emit("matchUser", {user, difficulty, category});

    // Redirects the user to the collab page(Implement later once roomid is established)
    // navigate("/collab", { replace: true })
  }

  return (
    <div className={styles.container}>
        <div>Please select a category</div>
        <select className={styles.input} onChange={(event) => {
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
        <Button variant='contained' onClick={matchUser}>Match</Button>
    </div>
  );
}