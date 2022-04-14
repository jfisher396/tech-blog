import axios from "axios";

const API = {
  // gets all posts
  getPosts: function () {
    return axios.get(`/api/posts`);
  },
  newUser: function (userData) {
    return axios.post(`/api/users/signup`, userData);
  },
  userLogin: function (loginData) {
    return axios.post(`/api/users/login`, loginData, {
      withCredentials: true,
    });
  },
  getCurrentUser: function () {
    return axios.get(`/api/users/readsessions`, {
      withCredentials: true,
    });
  },
  userLogout: function () {
    return axios.get(`/api/users/logout`, {
      withCredentials: true,
    });
  },
};

export default API;
