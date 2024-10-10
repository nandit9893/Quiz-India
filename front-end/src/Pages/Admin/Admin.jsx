import React, { useContext, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Admin.css";
import { toast } from "react-toastify";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
const Admin = () => {
  const { url } = useContext(AppContext);
  const [form, setForm] = useState({
    question: "",
    category: "",
    difficulty: "",
    incorrect_answers: "",
    correct_answer: "",
    type: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const addQuestion = async (event) => {
    event.preventDefault();
    const incorrectAnswersArray = form.incorrect_answers
      .split(",")
      .map((answer) => answer.trim());
    const newURL = `${url}/quiz/india/add/question`;
    try {
      const response = await axios.post(newURL, {
        question: form.question,
        category: form.category,
        difficulty: form.difficulty,
        incorrect_answers: incorrectAnswersArray,
        correct_answer: form.correct_answer,
        type: form.type,
      });
      if (response.data.success) {
        toast.success("Question added successfully");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="admin-add-question">
        <div className="add-add">
          <div className="question">
            <h3>What is the question?</h3>
            <input type="text" placeholder="Type here" name="question" value={form.question} onChange={changeHandler} />
          </div>
          <div className="question">
            <h3>What is the category?</h3>
            <input type="text" placeholder="Type here" name="category" value={form.category} onChange={changeHandler} />
          </div>
          <div className="type-difficulty">
          <select name="difficulty" value={form.difficulty} onChange={changeHandler}>
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select name="type" id="" value={form.type} onChange={changeHandler} >
            <option value="">Select Type</option>
            <option value="boolean">Boolean</option>
            <option value="multiple">Multitple</option>
          </select>
          </div>
          <div className="question">
            <h3>Correct Answer</h3>
            <input type="text" placeholder="Type here" name="correct_answer" value={form.correct_answer} onChange={changeHandler} />
          </div>
          <div className="question">
            <h3>Incorrect Answer</h3>
            <input type="text" placeholder="Type here" name="incorrect_answers" value={form.incorrect_answers} onChange={changeHandler} />
          </div>
          <button onClick={addQuestion}>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
