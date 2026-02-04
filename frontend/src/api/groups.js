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

// Join group
export const joinGroup = async (joinData) => {
  const res = await api.post("/groups/join", joinData);
  return res.data;
};
