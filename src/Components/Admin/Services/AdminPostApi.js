import axios from "axios";

const API = "http://localhost:5000/admin/posts";


// =====================
// GET POSTS (SEARCH SUPPORT)
// =====================
export const getPosts = async (search = "") => {
  return await axios.get(`${API}?search=${search}`);
};


// =====================
// DELETE (SOFT DELETE)
// =====================
export const deletePost = async (id) => {
  return await axios.delete(`${API}/${id}`);
};


// =====================
// HIDE POST
// =====================
export const hidePost = async (id) => {
  return await axios.patch(`${API}/${id}/hide`);
};


// =====================
// WARN POST
// =====================
export const warnPost = async (id) => {
  return await axios.patch(`${API}/${id}/warn`);
};


// =====================
// PREVIEW POST
// =====================
export const previewPost = async (id) => {
  return await axios.get(`${API}/${id}/preview`);
};