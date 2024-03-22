import axios from "axios";
export default axios.create({
  baseURL: "https://backend.itransportindex.com/api",
  headers: {
    "Content-type": "application/json"
  }
});