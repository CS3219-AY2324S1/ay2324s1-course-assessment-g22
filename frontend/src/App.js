import "./App.css";
import QuestionBank from "./questions/QuestionBank";
import QuestionDescription from "./questions/QuestionDescription";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<QuestionBank />} />
        <Route path="/question/:title" element={<QuestionDescription />} />
      </Routes>
    </Router>
  );
}

export default App;
