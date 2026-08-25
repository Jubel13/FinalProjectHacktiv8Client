import axios from "axios";

const instance = axios.create({
  baseURL: "https://final-project-hacktiv8-server.vercel.app/",
});

export default instance;
