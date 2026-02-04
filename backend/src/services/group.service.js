import Group from "../models/group.model.js";
import Member from "../models/member.model.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

/* =========================================================
   ✅ CREATE GROUP (Student Only)
   ========================================================= */
export const createGroup = async (name, description, creatorId) => {
  // 1. Validate input
  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }

  // 2. Check creator exists
  const creator = await User.findById(creatorId);
  if (!creator) {
    throw new ApiError(404, "User not found");
  }

  // 3. Only students can create groups
  if (creator.role !== "student") {
    throw new ApiError(403, "Only students can create groups");
  }

  // 4. Generate unique joinCode
  let joinCode;
  let exists = true;

  while (exists) {
    joinCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const existingGroup = await Group.findOne({ joinCode });
    if (!existingGroup) exists = false;
  }

  // 5. Create group (matches schema exactly)
  const group = await Group.create({
    name,
    description,
    joinCode,
    createdBy: creatorId, // ✅ MUST match schema field name
  });

  // 6. Add creator as admin member
  const adminMember = await Member.create({
    user: creatorId,
    group: group._id,
    role: "admin",
  });

  // 7. Push admin into group members list
  group.members.push(adminMember._id);
  await group.save();

  return group;
};

/* =========================================================
   ✅ JOIN GROUP (Student Only)
   ========================================================= */
export const joinGroup = async (joinCode, studentId) => {
  const student = await User.findById(studentId);

  if (!student || student.role !== "student") {
    throw new ApiError(403, "Only students can join groups");
  }

  const group = await Group.findOne({ joinCode });
  if (!group) throw new ApiError(404, "Group not found");

  const existing = await Member.findOne({
    group: group._id,
    user: studentId,
  });

  if (existing) throw new ApiError(400, "Already a member");

  const member = await Member.create({
    group: group._id,
    user: studentId,
    role: "student",
  });

  group.members.push(member._id);
  await group.save();

  return group;
};

/* =========================================================
   ✅ ADD TEACHER (Admin Only)
   ========================================================= */
export const addTeacherToGroup = async (groupId, teacherId, adminId) => {
  const adminMember = await Member.findOne({
    group: groupId,
    user: adminId,
    role: "admin",
  });

  if (!adminMember) {
    throw new ApiError(403, "Only group admins can add teachers");
  }

  const teacher = await User.findById(teacherId);

  if (!teacher || teacher.role !== "teacher") {
    throw new ApiError(400, "User is not a teacher");
  }

  const existing = await Member.findOne({
    group: groupId,
    user: teacherId,
  });

  if (existing) throw new ApiError(400, "Teacher already in group");

  const teacherMember = await Member.create({
    group: groupId,
    user: teacherId,
    role: "teacher",
  });

  const group = await Group.findById(groupId);
  group.members.push(teacherMember._id);
  await group.save();

  return teacherMember;
};

/* =========================================================
   ✅ GET GROUP BY ID
   ========================================================= */
export const getGroupById = async (groupId) => {
  const group = await Group.findById(groupId).populate({
    path: "members",
    populate: { path: "user", select: "username email role" },
  });

  if (!group) throw new ApiError(404, "Group not found");

  return group;
};

/* =========================================================
   ✅ LIST GROUPS FOR USER
   ========================================================= */
export const listGroupsForUser = async (userId) => {
  const memberships = await Member.find({ user: userId }).populate("group");
  return memberships.map((m) => m.group);
};

/* =========================================================
   ✅ REMOVE MEMBER (Admin Only)
   ========================================================= */
export const removeMember = async (groupId, memberId, adminId) => {
  const adminMember = await Member.findOne({
    group: groupId,
    user: adminId,
    role: "admin",
  });

  if (!adminMember) throw new ApiError(403, "Only admins can remove members");

  const member = await Member.findById(memberId);
  if (!member) throw new ApiError(404, "Member not found");

  await Member.findByIdAndDelete(memberId);

  const group = await Group.findById(groupId);

  group.members = group.members.filter(
    (m) => m.toString() !== memberId.toString()
  );

  await group.save();

  return group;
};

/* =========================================================
   ✅ DELETE GROUP (Admin Only)
   ========================================================= */
export const deleteGroup = async (groupId, adminId) => {
  const adminMember = await Member.findOne({
    group: groupId,
    user: adminId,
    role: "admin",
  });

  if (!adminMember) throw new ApiError(403, "Only admins can delete group");

  await Member.deleteMany({ group: groupId });
  await Group.findByIdAndDelete(groupId);

  return { message: "Group deleted successfully" };
};

/* =========================================================
   ✅ UPDATE GROUP (Admin Only)
   ========================================================= */
export const updateGroup = async (groupId, adminId, updates) => {
  const adminMember = await Member.findOne({
    group: groupId,
    user: adminId,
    role: "admin",
  });

  if (!adminMember) throw new ApiError(403, "Only admins can update group");

  const group = await Group.findByIdAndUpdate(groupId, updates, {
    new: true,
  });

  return group;
};

