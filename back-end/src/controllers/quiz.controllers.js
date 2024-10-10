import Quiz from "../models/quizmodels.js";

const setQuestion = async (req, res) => {
  const {
    category,
    correct_answer,
    difficulty,
    incorrect_answers,
    question,
    type,
  } = req.body;

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Category is required",
    });
  }

  const validBooleanAnswers = ["true", "false"];
  if (type === "boolean") {
    const isCorrectAnswerValid = validBooleanAnswers.includes(correct_answer.toLowerCase());
    if (!isCorrectAnswerValid) {
      return res.status(400).json({
        success: false,
        message:
          "Correct answer must be 'true' or 'false' for boolean questions",
      });
    }
  } else if (!correct_answer) {
    return res.status(400).json({
      success: false,
      message: "Correct answer is required",
    });
  }

  if (!difficulty) {
    return res.status(400).json({
      success: false,
      message: "Difficulty is required",
    });
  }

  if (type === "boolean") {
    if (
      !incorrect_answers ||
      incorrect_answers.length !== 1 ||
      !validBooleanAnswers.includes(incorrect_answers[0].toLowerCase())
    ) {
      return res.status(400).json({
        success: false,
        message:
          "For boolean questions, there must be one incorrect answer (the opposite of the correct answer)",
      });
    }
  } else if (
    !incorrect_answers ||
    !Array.isArray(incorrect_answers) ||
    incorrect_answers.length !== 3 ||
    !incorrect_answers.every(answer => typeof answer === "string")
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Incorrect answers are required and must be an array of exactly three strings",
    });
  }

  if (!question) {
    return res.status(400).json({
      success: false,
      message: "Question is required",
    });
  }
  if (!type) {
    return res.status(400).json({
      success: false,
      message: "Type is required",
    });
  }

  try {
    const existedQuestion = await Quiz.findOne({ question });
    if (existedQuestion) {
      return res.status(409).json({
        success: false,
        message: "Question is already present",
      });
    }

    const newQuestion = await Quiz.create({
      category,
      correct_answer,
      difficulty,
      incorrect_answers,
      question,
      type,
    });

    const questionSet = await Quiz.findById(newQuestion._id);
    if (!questionSet) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong while posting the question",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Question posted successfully",
      data: questionSet,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while posting the question",
      error: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Quiz.distinct("category");

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching categories",
      error: error.message,
    });
  }
};

const getQuestions = async (req, res) => {
  const { category, type, difficulty } = req.query;

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Category is required",
    });
  }
  if (!type) {
    return res.status(400).json({
      success: false,
      message: "Type is required",
    });
  }
  if (!difficulty) {
    return res.status(400).json({
      success: false,
      message: "Difficulty is required",
    });
  }

  try {
    const fetchedQuestions = await Quiz.find({ category, type, difficulty });

    if (fetchedQuestions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No questions available with data: ${category}, ${type}, ${difficulty}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      data: fetchedQuestions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch questions",
      error: error.message,
    });
  }
};

export { setQuestion, getQuestions, getCategories };
