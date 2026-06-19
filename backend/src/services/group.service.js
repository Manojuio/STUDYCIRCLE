import Group from "../models/group.model.js";
import Member from "../models/member.model.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const getJoinRequestTeacherMember = async (groupId, teacherId) => {
  return Member.findOne({ group: groupId, user: teacherId, role: "teacher" });
};

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
   ✅ TEACHER REQUEST JOIN (Teacher Only)
   ========================================================= */
export const requestTeacherJoin = async (joinCode, teacherId) => {
  const teacher = await User.findById(teacherId);

  if (!teacher || teacher.role !== "teacher") {
    throw new ApiError(403, "Only teacher users can request to join");
  }

  if (!joinCode) throw new ApiError(400, "Join code is required");

  const group = await Group.findOne({ joinCode });
  if (!group) throw new ApiError(404, "Group not found");

  const existingMember = await Member.findOne({
    group: group._id,
    user: teacherId,
    role: "teacher",
  });

  if (existingMember) {
    if (existingMember.joinStatus === "approved") {
      throw new ApiError(400, "Teacher already approved in this group");
    }
    if (existingMember.joinStatus === "pending") {
      throw new ApiError(400, "Teacher request already pending");
    }
  }

  // Create pending teacher member
  const teacherMember = await Member.create({
    group: group._id,
    user: teacherId,
    role: "teacher",
    joinStatus: "pending",
  });

  group.members.push(teacherMember._id);
  await group.save();

  return teacherMember;
};

/* =========================================================
   ✅ APPROVE/REJECT TEACHER REQUEST (Admin Only)
   ========================================================= */
export const approveTeacherJoin = async (groupId, teacherId, adminId, approve) => {
  const adminMember = await Member.findOne({
    group: groupId,
    user: adminId,
    role: "admin",
  });

  if (!adminMember) {
    throw new ApiError(403, "Only group admins can approve teachers");
  }

  const teacherMember = await getJoinRequestTeacherMember(groupId, teacherId);
  if (!teacherMember) {
    throw new ApiError(404, "Teacher join request not found");
  }

  if (teacherMember.joinStatus !== "pending") {
    throw new ApiError(400, `Teacher request is already ${teacherMember.joinStatus}`);
  }

  if (approve) {
    teacherMember.joinStatus = "approved";
    await teacherMember.save();

    return teacherMember;
  }

  // reject => remove member doc from group.members and delete member
  await Member.findByIdAndDelete(teacherMember._id);

  const group = await Group.findById(groupId);
  group.members = group.members.filter(
    (m) => m.toString() !== teacherMember._id.toString()
  );
  await group.save();

  return { message: "Teacher request rejected" };
};

/* =========================================================
   ✅ PENDING TEACHER REQUESTS (Admin Only)
   ========================================================= */
export const pendingTeacherRequests = async (adminId) => {
  // find groups where adminId is admin
  const adminMemberships = await Member.find({
    user: adminId,
    role: "admin",
  }).select("group");

  const groupIds = adminMemberships.map((m) => m.group);
  if (groupIds.length === 0) return [];

  const pending = await Member.find({
    group: { $in: groupIds },
    role: "teacher",
    joinStatus: "pending",
  }).populate("user", "username email role").populate("group", "name description joinCode");

  return pending.map((m) => ({
    memberId: m._id,
    teacherId: m.user._id,
    teacher: m.user,
    group: m.group,
    joinStatus: m.joinStatus,
    requestedAt: m.createdAt,
  }));
};

/* =========================================================
   ✅ GET GROUP BY ID
   ========================================================= */
export const getGroupById = async (groupId) => {
  const group = await Group.findById(groupId).populate({
    path: "members",
    populate: { path: "user", select: "username email role" },
    match: { joinStatus: "approved" },
  });

  if (!group) throw new ApiError(404, "Group not found");

  return group;
};

/* =========================================================
   ✅ LIST GROUPS FOR USER
   ========================================================= */
export const listGroupsForUser = async (userId) => {
  const memberships = await Member.find({
    user: userId,
  }).populate("group");

  return memberships
    .filter((m) => {
      if (m.role === "teacher") return m.joinStatus === "approved";
      return true;
    })
    .map((m) => m.group);
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

