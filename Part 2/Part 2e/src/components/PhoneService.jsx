import axios from "axios";

const url = "http://localhost:3001/persons";

const addPerson = (noteObject) => {
  const request = axios.post(url, noteObject);
  return request.then((response) => response.data);
};

const getPerson = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const updatePerson = (id, noteObject) => {
  const request = axios.put(`${url}/${id}`, noteObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request;
};

export default {
  addPerson,
  getPerson,
  deletePerson,
  updatePerson,
};
