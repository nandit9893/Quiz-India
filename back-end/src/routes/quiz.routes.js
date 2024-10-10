import { Router } from "express";
import { getCategories, getQuestions, setQuestion } from "../controllers/quiz.controllers.js";

const quizRouter = Router();

quizRouter.route("/add/question").post(setQuestion);
quizRouter.route("/get/questions").get(getQuestions);
quizRouter.route("/get/meta/data").get(getCategories);

export default quizRouter;
