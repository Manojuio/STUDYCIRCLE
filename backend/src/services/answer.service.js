import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";
import Member from "../models/member.model.js";
import ApiError from "../utils/ApiError.js";

/* ================================
   Post Answer
================================ */
export const createAnswerService = async (
  questionId,
  userId,
  text
) => {
  const question = await Question.findById(questionId);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  // membership check (same group)
  const member = await Member.findOne({
    group: question.group,
    user: userId,
  });

  if (!member) {
    throw new ApiError(403, "Not allowed");
  }

  return Answer.create({
    question: questionId,
    answeredBy: userId,
    text,
  });
};


export const listAnswersService = async (questionId, userId) => {
  const question = await Question.findById(questionId);

  if (!question) throw new ApiError(404, "Question not found");

  const member = await Member.findOne({
    group: question.group,
    user: userId,
    role: "teacher",
  });

  if (!member) throw new ApiError(403, "Not allowed");

  return Answer.find({ question: questionId })
    .populate("answeredBy", "username role")
    .sort({ createdAt: 1 });
};
