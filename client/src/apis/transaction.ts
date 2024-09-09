import { API_URL } from "@/utils/env";
import { apiGet } from "./api";

export type Transaction = {
  _id: string;
  from: string;
  to: string;
  amount: number;
};

export const getAddressTransactions = async (address: string) => {
  const res = await apiGet(API_URL + "/transactions/" + address);
  return res.data as Transaction[];
};

export const getAllTransactions = async () => {
  const res = await apiGet(API_URL + "/all/transactions");
  return res.data as Transaction[];
};

export const getTransactions = async (address?: string) => {
  return address ? getAddressTransactions(address) : getAllTransactions();
};
