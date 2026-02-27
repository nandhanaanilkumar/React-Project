import axios from "axios";

const API = "http://localhost:5000/admin/posts";

export const getPosts = () => axios.get(API);

export const deletePost = (id) =>
  axios.put(`${API}/delete/${id}`);

export const hidePost = (id) =>
  axios.put(`${API}/hide/${id}`);

export const warnPost = (id) =>
  axios.put(`${API}/warn/${id}`);