import Question from "../models/question.model.js";
import ApiError from "../utils/ApiError.js";
import Member from "../models/member.model.js";
import Answer from "../models/answer.model.js";

export const createQuestionService = async (
    groupId,
     userId,
      title,
       description) => {
        const member = await Member.findOne({ group: groupId, user: userId });

        if (!member) {
            throw new ApiError(403, "Not a member of this group");
        }
        if(!title || !description){
            throw new ApiError(400, "Title and description are required");
        }
        return await Question.create({
            group: groupId,
            askedBy: userId,
            title,
            description,
        });

}

export const listQuestionsService = async(
    groupId,
    userId,
    title,
    description
)=>{
    const member = await Member.findOne({group:groupId,user :userId
    });
    if(!member){
        throw new ApiError(403,"Not a member of this group");
    }
    return Question.find({group:groupId})
    .populate("askedBy")
    .sort({createdAt:-1});
}

/* ================================
   Delete Question (Only Owner)
================================ */
export const deleteQuestionService = async (questionId, userId) => {
  const question = await Question.findById(questionId);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  // Only asker can delete
  if (question.askedBy.toString() !== userId.toString()) {
    throw new ApiError(403, "You cannot delete this question");
  }

  // Delete all answers linked
  await Answer.deleteMany({ question: questionId });

  // Delete question
  await Question.findByIdAndDelete(questionId);

  return { message: "Question deleted successfully" };
};
