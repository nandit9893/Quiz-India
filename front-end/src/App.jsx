import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import User from "./Pages/User/User";
import Admin from "./Pages/Admin/Admin";
import Result from "./Pages/Result/Result";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<User />} />
        <Route path="/add" element={<Admin />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
