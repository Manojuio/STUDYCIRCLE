import api from "./axios";

// Register API
export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Login API
export const loginUser = async (loginData) => {
  const res = await api.post("/auth/login", loginData);
  return res.data;
};
