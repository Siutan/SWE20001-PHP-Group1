import axios from "axios";

const API_URL = "https://sisrestapi.herokuapp.com/auth/";

const login = async (username, password) => {
  const user_id = username
  const payload = {
    "user_id": user_id,
    "password": password
  }
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
    
};
const response = await fetch(API_URL + 'login', requestOptions);
    const data = await response.json();
    if (data) {
        localStorage.setItem("user", JSON.stringify(data));
    }
    return response;
}

// const login = async (username, password) => {
//   const user_id = username
//   const response = await axios
//         .post(API_URL + "login", {
//             user_id,
//             password
//         }, 
//         {withCredentials: true}
//         );
//     if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     return response;
// };

const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios
        .post(API_URL + "logout", {},
        {withCredentials: true}
        );
        return response;
  };

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};