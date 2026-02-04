import api from "./axios";

// List questions
export const fetchQuestions = async (groupId) => {
  const res = await api.get(`/groups/${groupId}/questions`);
  return res.data;
};

// Ask question
export const askQuestion = async (groupId, data) => {
  const res = await api.post(`/groups/${groupId}/questions`, data);
  return res.data;
};
