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


const logout = () => {
  const logoutOptions = {
  method: 'DELETE',
  credentials: 'include',
}
fetch(API_URL + 'logout', logoutOptions)
.then(localStorage.removeItem('user'))
.then(window.location.reload())

}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};