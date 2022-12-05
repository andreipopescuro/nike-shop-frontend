import axios from "axios";
const base_URL = `${process.env.REACT_APP_API_URL}/api/`;

// const base_URL =  "http://localhost:5000/api/"

let token;
if (localStorage.getItem("persist:root")) {
  if (
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser
  )
    token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser.accesToken;
}

export const publicRequest = axios.create({
  baseURL: base_URL,
});

export const userRequest = axios.create({
  baseURL: base_URL,
  headers: { token: `Bearer ${token}` },
});

export { token };
