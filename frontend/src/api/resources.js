import api from "./axios";

// List resources
export const fetchResources = async (groupId) => {
  const res = await api.get(`/groups/${groupId}/resources`);
  return res.data;
};

// Add resource link
export const addResource = async (groupId, data) => {
  const res = await api.post(`/groups/${groupId}/resources`, data);
  return res.data;
};

// Delete resource
export const deleteResource = async (resourceId) => {
  const res = await api.delete(`/groups/resources/${resourceId}`);
  return res.data;
};
