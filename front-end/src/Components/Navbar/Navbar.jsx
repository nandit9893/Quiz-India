import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate("/play"); 
  };

  const handleAddQuestionClick = () => {
    navigate("/add"); 
  };


  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Quiz India Logo" />
        <h1>QUIZ INDIA</h1>
      </div>
      <div className="nav-right">
        <ul>
          <li onClick={handlePlayClick}>Play</li>
          <li onClick={handleAddQuestionClick}>Add Question</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
