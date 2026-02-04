import api from "./axios";

export const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
