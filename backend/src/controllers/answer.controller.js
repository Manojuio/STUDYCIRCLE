import ApiResponse from "../utils/ApiResponse.js";
import {
  createAnswerService,
  listAnswersService,
} from "../services/answer.service.js";

export const createAnswer = async (req, res, next) => {
  try {
    const { text } = req.body;

    const answer = await createAnswerService(
      req.params.questionId,
      req.user.id,
      text
    );

    res.status(201).json(
      new ApiResponse(201, answer, "Answer added")
    );
  } catch (err) {
    next(err);
  }
};

export const listAnswers = async (req, res, next) => {
  try {
    const answers = await listAnswersService(
      req.params.questionId,
      req.user.id
    );

    res.status(200).json(
      new ApiResponse(200, answers, "Answers fetched")
    );
  } catch (err) {
    next(err);
  }
};
