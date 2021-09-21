import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

const login = async (username, password) => {
    const user_id = username
  const response = await axios
        .post(API_URL + "login", {
            user_id,
            password
        }, {withCredentials: true}
        );
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
};

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