import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Result.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Result = () => {
  const { correctedScore, setCorrectedScore, inCorrectedScore, setInCorrectedScore , totalNumberOfQuestion, setTotalNumberOfQuestion } = useContext(AppContext);  
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    setTotalNumberOfQuestion(0);
    setCorrectedScore(0);
    setInCorrectedScore(0);
    navigate("/play")
  };

  return (
    <div>
      <Navbar />
      <div className="result">
        <h2>Hurrah!</h2>
        <div className="stats">
            <h3>Number of Questions Attempted :</h3>
            <p>{totalNumberOfQuestion}</p>
        </div>
        <div className="stats">
            <h3>Correct Answers :</h3>
            <p>{correctedScore}</p>
        </div>
        <div className="stats">
            <h3>Wrong Answers :</h3>
            <p>{inCorrectedScore}</p>
        </div>
        <div className="stats">
            <h3>Score :</h3>
            <p>{correctedScore}</p>
        </div>
        <div className="result-navigate">
            <button onClick={handlePlayAgain}>Play Again</button>
            <button onClick={()=>navigate("/")}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default Result;
