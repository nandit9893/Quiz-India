import express from "express";
import cors from "cors";
import quizRouter from "./routes/quiz.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("/public"));


app.use("/quiz/india", quizRouter);

export default app;