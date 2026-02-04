import api from "./axios";

// Get group details
export const fetchGroup = async (groupId) => {
  const res = await api.get(`/groups/${groupId}`);
  return res.data;
};
