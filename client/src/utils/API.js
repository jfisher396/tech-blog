import axios from "axios";

const API = {
  // gets all posts
  getPosts: function () {
    return axios.get(`/api/posts`);
  },
  getSinglePost: function (id) {
    return axios.get(`api/posts/post/${id}`)
  },
  getUserPosts: function () {
    return axios.get(`/api/posts/byuser/:id`)
  },
  newPost: function (postData) {
    return axios.post(`/api/posts`, postData)
  },
  editPost: function (postData) {
    return axios.put(`/api/posts/:id`, postData)
  },
  deletePost: function (id) {
    return axios.delete(`/api/posts/${id}`) 
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
