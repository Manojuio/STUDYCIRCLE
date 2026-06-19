import express from "express";
import {
  create,
  join,
  requestTeacher,
  approveTeacher,
  getGroup,
  listUserGroups,
  pendingTeachers,
  remove,
  removeGroup,
  update
} from "../controllers/group.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, create);                // create group
router.post("/join", authMiddleware, join);                  // student join group via joinCode

// teacher join request workflow
router.post("/request-teacher", authMiddleware, requestTeacher);
router.post("/approve-teacher", authMiddleware, approveTeacher);

// get group endpoints
router.get("/", authMiddleware, listUserGroups);              // list groups for user

// admin can view pending teacher requests for all groups
router.get("/pending-teachers", authMiddleware, pendingTeachers);

// get group by ID (MUST be after fixed-string routes like /pending-teachers)
router.get("/:groupId", authMiddleware, getGroup);            // get group by ID



router.delete("/:groupId/members/:memberId", authMiddleware, remove);
        // remove member
router.delete("/:groupId", authMiddleware, removeGroup); // delete group
router.put("/:groupId", authMiddleware, update);         // update group


export default router;