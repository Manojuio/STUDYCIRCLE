import {
  createGroup,
  joinGroup,
  addTeacherToGroup,
  getGroupById,
  listGroupsForUser,
  removeMember,
  deleteGroup,
  updateGroup
} from "../services/group.service.js";

import ApiResponse from "../utils/ApiResponse.js";

// ==============================
// CREATE GROUP
// ==============================
export const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // ✅ FIX 1: Validate request body early
    if (!name || !description) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Name and description are required"));
    }

    // ✅ FIX 2: req.user MUST exist (auth middleware required)
    // If req.user is undefined → createdBy becomes undefined → validation error
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Unauthorized: user not found"));
    }

    // ✅ FIX 3: joinCode + createdBy must be handled inside service
    // Controller should only pass userId, not joinCode
    const group = await createGroup(name, description, req.user.id);

    res.status(201).json(new ApiResponse(201, group, "Group created"));
  } catch (err) {
    next(err);
  }
};

// ==============================
// JOIN GROUP
// ==============================
export const join = async (req, res, next) => {
  try {
    const { joinCode } = req.body;

    if (!joinCode) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Join code is required"));
    }

    const group = await joinGroup(joinCode, req.user.id);

    res.status(200).json(new ApiResponse(200, group, "Joined group"));
  } catch (err) {
    next(err);
  }
};

// ==============================
// ADD TEACHER
// ==============================
export const addTeacher = async (req, res, next) => {
  try {
    const { groupId, teacherId } = req.body;

    const teacherMember = await addTeacherToGroup(
      groupId,
      teacherId,
      req.user.id
    );

    res
      .status(201)
      .json(new ApiResponse(201, teacherMember, "Teacher added"));
  } catch (err) {
    next(err);
  }
};

// ==============================
// GET GROUP BY ID
// ==============================
export const getGroup = async (req, res, next) => {
  try {
    const group = await getGroupById(req.params.groupId);

    res.status(200).json(new ApiResponse(200, group, "Group details"));
  } catch (err) {
    next(err);
  }
};

// ==============================
// LIST GROUPS FOR USER
// ==============================
export const listUserGroups = async (req, res, next) => {
  try {
    const groups = await listGroupsForUser(req.user.id);

    res.status(200).json(new ApiResponse(200, groups, "User groups"));
  } catch (err) {
    next(err);
  }
};

// ==============================
// REMOVE MEMBER
// ==============================
export const remove = async (req, res, next) => {
  try {
    const { groupId, memberId } = req.body;

    const group = await removeMember(groupId, memberId, req.user.id);

    res.status(200).json(new ApiResponse(200, group, "Member removed"));
  } catch (err) {
    next(err);
  }
};

// ==============================
// DELETE GROUP
// ==============================
export const removeGroup = async (req, res, next) => {
  try {
    const result = await deleteGroup(req.params.groupId, req.user.id);

    res.status(200).json(new ApiResponse(200, result, "Group deleted"));
  } catch (err) {
    next(err);
  }
};

// ==============================
// UPDATE GROUP
// ==============================
export const update = async (req, res, next) => {
  try {
    const group = await updateGroup(req.params.groupId, req.user.id, req.body);

    res.status(200).json(new ApiResponse(200, group, "Group updated"));
  } catch (err) {
    next(err);
  }
};
