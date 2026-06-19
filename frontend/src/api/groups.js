import api from "./axios";

// Get groups for logged-in user
export const fetchUserGroups = async () => {
  const res = await api.get("/groups");
  return res.data;
};

// Create group
export const createGroup = async (groupData) => {
  const res = await api.post("/groups/create", groupData);
  return res.data;
};

// Join group (student)
export const joinGroup = async (joinData) => {
  const res = await api.post("/groups/join", joinData);
  return res.data;
};

// Teacher request to join group via joinCode
export const requestTeacherJoin = async (data) => {
  const res = await api.post("/groups/request-teacher", data);
  return res.data;
};

// Admin: list pending teacher requests
export const fetchPendingTeacherRequests = async () => {
  const res = await api.get("/groups/pending-teachers");
  return res.data;
};

// Admin approve/reject teacher join request
export const approveTeacherJoin = async (data) => {
  const res = await api.post("/groups/approve-teacher", data);
  return res.data;
};

