import React, { useContext } from "react";
import "./UserSideBar.css";
import { AppContext } from "../../Context/AppContext";

const UserSideBar = () => {
  const { setType, setDifficulty, setCategory, categories } = useContext(AppContext);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "category":
        setCategory(value);
        break;
      case "difficulty":
        setDifficulty(value);
        break;
      case "type":
        setType(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="usersidebar">
      <div className="select-options">
        <h2>Category</h2>
        <div className="select">
          <select name="category" onChange={changeHandler}>
            <option value="none">None</option>
            {
              categories.map((categ, index) => (
                <option key={index} value={categ}>{categ}</option>
              ))
            }
          </select>
        </div>
        <h2>Difficulty</h2>
        <div className="select">
          <select name="difficulty" onChange={changeHandler}>
            <option value="none">None</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <h2>Type</h2>
        <div className="select" onChange={changeHandler}>
          <select name="type">
            <option value="none">None</option>
            <option value="multiple">Multiple</option>
            <option value="boolean">True/False</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
