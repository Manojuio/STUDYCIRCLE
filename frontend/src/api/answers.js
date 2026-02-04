import api from "./axios";

// Get answers for a question
export const fetchAnswers = async (questionId) => {
  const res = await api.get(`/groups/questions/${questionId}/answers`);
  return res.data;
};

// Teacher posts answer
export const postAnswer = async (questionId, text) => {
  const res = await api.post(`/groups/questions/${questionId}/answers`, {
    text,
  });
  return res.data;
};
