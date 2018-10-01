import axios from "axios";


// create an axios object with the common settings we need for all requests
// (reduces the repetition between components)
const api = axios.create({
  // the initial part of all our backend route URLs
  baseURL: "http://localhost:4000/api",
  // allows axios to send cookies to the backend
  withCredentials: true,
});


export default api;
