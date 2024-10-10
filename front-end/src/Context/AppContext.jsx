import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const url = "https://quiz-india-back-end.onrender.com";
  const [ categories, setCategories ] = useState([]);
  const [ category, setCategory ] = useState("none");
  const [ type, setType ] = useState("none");
  const [ difficulty, setDifficulty ] = useState("none");
  const [ questionData, setQuestionData ] = useState([]);
  const [ totalNumberOfQuestion, setTotalNumberOfQuestion ] = useState(0);
  const [ correctedScore, setCorrectedScore ] = useState(0);
  const [ inCorrectedScore, setInCorrectedScore ] = useState(0);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const newURL = `${url}/quiz/india/get/meta/data`;
    try {
      const response = await axios.get(newURL);
      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        console.log("Unable to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const getQuestion = async () => {
    if (category === "none" || type === "none" || difficulty === "none") {
      return;
    }
    const newURL = `http://localhost:8000/quiz/india/get/questions?category=${category}&type=${type}&difficulty=${difficulty}`;
    try {
      const response = await axios.get(newURL, {}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.data.success) {
        setQuestionData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const contextValues = {
    categories,
    setCategories,
    category,
    setCategory,
    type,
    setType,
    difficulty,
    setDifficulty,
    getQuestion,
    questionData,
    totalNumberOfQuestion,
    setTotalNumberOfQuestion,
    correctedScore,
    setCorrectedScore,
    inCorrectedScore,
    setInCorrectedScore,
    setQuestionData,
    url,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
