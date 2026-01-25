import express from "express";
import {
  create,
  join,
  addTeacher,
  getGroup,
  listUserGroups,
  remove,
  removeGroup,
  update
} from "../controllers/group.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, create);                // create group
router.post("/join", authMiddleware, join);              // join group
router.post("/add-teacher", authMiddleware, addTeacher); // add teacher
router.get("/:groupId", authMiddleware, getGroup);       // get group by ID
router.get("/", authMiddleware, listUserGroups);         // list groups for user
router.delete("/member", authMiddleware, remove);        // remove member
router.delete("/:groupId", authMiddleware, removeGroup); // delete group
router.put("/:groupId", authMiddleware, update);         // update group

export default router;