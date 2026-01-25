import Group from "../models/group.model.js";
import Member from "../models/member.model.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

// ✅ Create Group (student only)

export const createGroup = async ({ name, description, creatorId}) => {
    const creator = await Group.create({ name, description,creatorId });
   if(!creator || creator.role !== "student")
     throw new ApiError(403, "only students can create groups");

   const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

   const group = new Group({ name, description, joinCode, creatorBy: creatorId });
 await group.save();

 const addMember = new Member({ user: creatorId, group: group._id, role: "admin" });
 await addMember.save();
group.members.push(adminMember._id);
  await group.save();

  return group;
};

// ✅ Join Group (student only)
export const joinGroup = async (joinCode, studentId) => {
  const student = await User.findById(studentId);
  if (!student || student.role !== "student") {
    throw new ApiError(403, "Only students can join groups");
  }

  const group = await Group.findOne({ joinCode });
  if (!group) throw new ApiError(404, "Group not found");

  const existing = await Member.findOne({ group: group._id, user: studentId });
  if (existing) throw new ApiError(400, "Already a member");

  const member = new Member({ group: group._id, user: studentId, role: "student" });
  await member.save();

  group.members.push(member._id);
  await group.save();

  return group;
};

// ✅ Add Teacher (admin only)
export const addTeacherToGroup = async (groupId, teacherId, adminId) => {
  const adminMember = await Member.findOne({ group: groupId, user: adminId, role: "admin" });
  if (!adminMember) throw new ApiError(403, "Only group admins can add teachers");

  const teacher = await User.findById(teacherId);
  if (!teacher || teacher.role !== "teacher") {
    throw new ApiError(400, "User is not a teacher");
  }

  const existing = await Member.findOne({ group: groupId, user: teacherId });
  if (existing) throw new ApiError(400, "Teacher already in group");

  const teacherMember = new Member({ group: groupId, user: teacherId, role: "teacher" });
  await teacherMember.save();

  const group = await Group.findById(groupId);
  group.members.push(teacherMember._id);
  await group.save();

  return teacherMember;
};

export const getGroupById = async (groupId) => {
  const group = await Group.findById(groupId)
    .populate({
      path: "members",
      populate: { path: "user", select: "username email role" }
    });
  if (!group) throw new ApiError(404, "Group not found");
  return group;
};

export const listGroupsForUser = async (userId) => {
  const memberships = await Member.find({ user: userId }).populate("group");
  return memberships.map(m => m.group);
};

export const removeMember = async (groupId, memberId, adminId) => {
  const adminMember = await Member.findOne({ group: groupId, user: adminId, role: "admin" });
  if (!adminMember) throw new ApiError(403, "Only admins can remove members");

  const member = await Member.findById(memberId);
  if (!member) throw new ApiError(404, "Member not found");

  await Member.findByIdAndDelete(memberId);

  const group = await Group.findById(groupId);
  group.members = group.members.filter(m => m.toString() !== memberId.toString());
  await group.save();

  return group;
};

export const deleteGroup = async (groupId, adminId) => {
  const adminMember = await Member.findOne({ group: groupId, user: adminId, role: "admin" });
  if (!adminMember) throw new ApiError(403, "Only admins can delete group");

  await Member.deleteMany({ group: groupId });
  await Group.findByIdAndDelete(groupId);

  return { message: "Group deleted successfully" };
};

export const updateGroup = async (groupId, adminId, updates) => {
  const adminMember = await Member.findOne({ group: groupId, user: adminId, role: "admin" });
  if (!adminMember) throw new ApiError(403, "Only admins can update group");

  const group = await Group.findByIdAndUpdate(groupId, updates, { new: true });
  return group;
};