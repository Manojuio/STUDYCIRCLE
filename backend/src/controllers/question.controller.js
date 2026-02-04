import ApiResponse from "../utils/ApiResponse.js";
import {
  createQuestionService,
  listQuestionsService,
  deleteQuestionService,
} from "../services/question.service.js";

export const createQuestion = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const question = await createQuestionService(
      req.params.groupId,
      req.user.id,
      title,
      description
    );

    res.status(201).json(
      new ApiResponse(201, question, "Question posted")
    );
  } catch (err) {
    next(err);
  }
};

export const listQuestions = async (req, res, next) => {
  try {
    const questions = await listQuestionsService(
      req.params.groupId,
      req.user.id
    );

    res.status(200).json(
      new ApiResponse(200, questions, "Questions fetched")
    );
  } catch (err) {
    next(err);
  }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    const result = await deleteQuestionService(
      req.params.questionId,
      req.user.id
    );

    res.status(200).json(
      new ApiResponse(200, result, "Question deleted")
    );
  } catch (err) {
    next(err);
  }
};

