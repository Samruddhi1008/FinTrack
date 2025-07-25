import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/transactions",
});

export const getTransactions = () => API.get("/");
export const addTransaction = (data) => API.post("/", data);
export const deleteTransaction = (id) => API.delete(`/${id}`);
export const updateTransaction = (id, data) => API.put(`/${id}`, data);
