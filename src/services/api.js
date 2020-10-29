import axios from "axios";

const host = "http://localhost:9999";

export const getTaskList = async () => {
  const res = await axios.get(`${host}/tasks`);
  return res.data;
};

export const updateTask = async (task) => {
  const res = await axios.post(`${host}/tasks/update`, task);
  return res.data;
};
