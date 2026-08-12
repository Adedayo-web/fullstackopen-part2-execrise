import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "this note is not saved to the server",
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
  const request = axios.post(
    baseUrl,
    newObject,
  ); /* it sends the post request to the server and store the data in the variable request */
  return request.then(
    (response) => response.data,
  ); /* this returns the data stored in the response after it is gotten */
};

const update = (id, newObject) => {
  const request = axios.put(
    `${baseUrl}/${id}`,
    newObject,
  ); /* it sends the put request to the server and store the data in the variable request */
  return request.then(
    (response) => response.data,
  ); /* this returns the data stored in the response after it is gotten */
};

export default {
  getAll,
  create,
  update,
};
