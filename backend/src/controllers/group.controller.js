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

// Create group
export const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const group = await createGroup(name, description, req.user.id);
    res.status(201).json(new ApiResponse(201, group, "Group created"));
  } catch (err) {
    next(err);
  }
};

// Join group
export const join = async (req, res, next) => {
  try {
    const { joinCode } = req.body;
    const group = await joinGroup(joinCode, req.user.id);
    res.status(200).json(new ApiResponse(200, group, "Joined group"));
  } catch (err) {
    next(err);
  }
};

// Add teacher
export const addTeacher = async (req, res, next) => {
  try {
    const { groupId, teacherId } = req.body;
    const teacherMember = await addTeacherToGroup(groupId, teacherId, req.user.id);
    res.status(201).json(new ApiResponse(201, teacherMember, "Teacher added"));
  } catch (err) {
    next(err);
  }
};

// Get group by ID
export const getGroup = async (req, res, next) => {
  try {
    const group = await getGroupById(req.params.groupId);
    res.status(200).json(new ApiResponse(200, group, "Group details"));
  } catch (err) {
    next(err);
  }
};

// List groups for logged-in user
export const listUserGroups = async (req, res, next) => {
  try {
    const groups = await listGroupsForUser(req.user.id);
    res.status(200).json(new ApiResponse(200, groups, "User groups"));
  } catch (err) {
    next(err);
  }
};

// Remove member
export const remove = async (req, res, next) => {
  try {
    const { groupId, memberId } = req.body;
    const group = await removeMember(groupId, memberId, req.user.id);
    res.status(200).json(new ApiResponse(200, group, "Member removed"));
  } catch (err) {
    next(err);
  }
};

// Delete group
export const removeGroup = async (req, res, next) => {
  try {
    const result = await deleteGroup(req.params.groupId, req.user.id);
    res.status(200).json(new ApiResponse(200, result, "Group deleted"));
  } catch (err) {
    next(err);
  }
};

// Update group
export const update = async (req, res, next) => {
  try {
    const group = await updateGroup(req.params.groupId, req.user.id, req.body);
    res.status(200).json(new ApiResponse(200, group, "Group updated"));
  } catch (err) {
    next(err);
  }
};