import { API_URL } from "@/utils/env";
import { apiPost } from "./api";

export type Wallet = {
  privateKey: string;
  publicKey: string;
  name: string;
  balance: number;
};

export const getMeApi = async () => {
  const res = await apiPost(API_URL + "/me");
  return res.data as Wallet;
};

export const getWallet = async (address: string) => {
  const res = await apiPost(API_URL + "/wallet/address/" + address);
  return res.data as Wallet;
};

export type SendCoin = {
  from: string;
  to: string;
  amount: number;
};

export const sendCoinApi = async (data: SendCoin) => {
  const res = await apiPost(API_URL + "/transfer", data);
  return res.data;
};

export const mineCoinApi = async () => {
  const res = await apiPost(API_URL + "/mine");
  return res.data;
};
