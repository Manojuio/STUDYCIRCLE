import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createQuestion,
  listQuestions,
  deleteQuestion,
} from "../controllers/question.controller.js";

import {
  createAnswer,
  listAnswers,
} from "../controllers/answer.controller.js";

const router = express.Router();


router.post("/:groupId/questions", authMiddleware, createQuestion);
router.get("/:groupId/questions", authMiddleware, listQuestions);
router.delete("/questions/:questionId", authMiddleware, deleteQuestion);


router.post("/questions/:questionId/answers", authMiddleware, createAnswer);
router.get("/questions/:questionId/answers", authMiddleware, listAnswers);

export default router;
