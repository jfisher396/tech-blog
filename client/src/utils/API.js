import axios from "axios";

const API = {
  // gets all posts
  getPosts: function () {
    return axios.get("/api/posts");
  },
};

export default API;
