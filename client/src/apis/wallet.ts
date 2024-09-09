import { API_URL } from "@/utils/env";
import { apiPost } from "./api";

export const createWalletApi = async (data: {
  name: string;
  password: string;
}) => {
  const res = await apiPost(API_URL + "/wallet/create", data);
  return res.data;
};

export const signinApi = async (data: { name: string; password: string }) => {
  const res = await apiPost(API_URL + "/wallet/signin", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await apiPost(API_URL + "/logout");
  return res.data;
};
