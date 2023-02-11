import axios from "axios";

export const getPrices = async () =>
  await axios.get("https://burger-api-xcwp.onrender.com/ingredients");

export const createOrder = async (orderData) =>
  await axios.post("https://burger-api-xcwp.onrender.com/orders", orderData);

export const getContacts = async () =>
  await axios.get("https://burger-api-xcwp.onrender.com/contact");

export const getOrders = async () =>
  await axios.get("https://burger-api-xcwp.onrender.com/orders");
