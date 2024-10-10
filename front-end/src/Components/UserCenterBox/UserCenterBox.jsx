import React, { useContext, useEffect, useState } from "react";
import "./UserCenterBox.css";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const UserCenterBox = () => {
  const navigate = useNavigate();
  const { category, difficulty, setType, setDifficulty, setQuestionData, setCategory, type, getQuestion, questionData, setTotalNumberOfQuestion, setCorrectedScore, setInCorrectedScore, inCorrectedScore } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const isSelectionIncomplete = category === "none" || type === "none" || difficulty === "none";

  useEffect(() => {
    getQuestion();
  }, [category, type, difficulty]);

  useEffect(() => {
    if (questionData.length > 0 && count < questionData.length) {
      const currentQuestion = questionData[count];
      const { correct_answer, incorrect_answers } = currentQuestion;
      const allOptions = [correct_answer, ...incorrect_answers];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
      setCorrectAnswer(correct_answer);
      setTotalNumberOfQuestion(questionData.length);
      const newTimeLimit = difficulty === "easy" ? 30 : difficulty === "medium" ? 90 : 120;
      setTimeLimit(newTimeLimit);
      setRemainingTime(newTimeLimit);
      setTimerActive(true);
    }
  }, [questionData, count, difficulty]);

  useEffect(() => {
    if (timerActive && remainingTime > 0) {
      const timerId = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (remainingTime === 0) {
      if (count === questionData.length - 1) {
        handleSubmit(); 
      } else {
        nextQuestion(); 
      }
    }
  }, [timerActive, remainingTime, count]);

  const nextQuestion = () => {
    if (selectedOption === correctAnswer) {
      setCorrectedScore((prev) => prev + 1);
      
    } else if (selectedOption !== correctAnswer) {
      setInCorrectedScore((prev) => prev + 1); 
    }
    if (count < questionData.length - 1) {
      setCount((prev) => prev + 1);
      setSelectedOption("");
      setRemainingTime(timeLimit); 
    }
  };

  const changeHandler = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    setCategory("none")
    setDifficulty("none");
    setType("none");
    setCount(0);
    setQuestionData([]);
    navigate("/result");
  };

  return (
    <div className="usercenterbox">
      {
        isSelectionIncomplete ? 
        (
          <div className="is">
            <h2>Please select category, type and difficulty !!</h2>
          </div>
        ) : 
        (
          <>
            <div className="user-center-box-nav">
              <p>Question {count + 1} of {questionData.length}</p>
              <div className="timer">
                <p>{remainingTime}</p>
              </div>
            </div>
            <div className="center-question">
              <p>{questionData[count]?.question}</p> 
              <div className="option-list">
                {
                  options.map((option, index) => (
                    <label key={index} htmlFor={`option-${index}`}>
                      <input type="radio" id={`option-${index}`} name="questionOptions" value={option} onChange={changeHandler} checked={selectedOption === option}  />
                      <span>{option}</span>
                    </label>
                  ))
                }
              </div>
            </div>
            <div className="save-next">
              <button onClick={nextQuestion} disabled={count+1 === questionData.length}  className={count + 1 === questionData.length ? "disabled" : ""}>Save and Next</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )
      }
    </div>
  );
};

export default UserCenterBox;
