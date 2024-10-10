import React from 'react';
import "./Home.css";
import Navbar from '../../Components/Navbar/Navbar';

const Home = () => {
  const totalQuestions = 20000;
  const quizCategories = ["General Knowledge", "Science", "History", "Literature", "Mathematics"];
  const availableUsers = 300;
  const dailyQuestionPosters = 25; 

  return (
    <div>
        <Navbar />
        <div className="home-info">
          <h1>Welcome to Quiz India</h1>
          <div className="info-card">
            <h2>Questions Availbe: {totalQuestions} +</h2>
          </div>
          <div className="info-card">
            <h2>Quiz Categories: 100 +</h2>
            <ul>
              {
                quizCategories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))
              }
            </ul>
          </div>
          <div className="info-card">
            <h2>Available Users: {availableUsers}</h2>
          </div>
          <div className="info-card">
            <h2>People Posting Questions Daily:  {dailyQuestionPosters}</h2>
          </div>
        </div>
    </div>
  );
}

export default Home;
