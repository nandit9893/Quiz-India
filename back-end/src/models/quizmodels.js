import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: Schema.Types.Mixed,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  incorrect_answers: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["multiple", "boolean"],
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
