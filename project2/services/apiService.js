const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'http://20.244.56.144/evaluation-service';

const HEADERS = {
  Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
};

const fetchUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`, { headers: HEADERS });
  return res.data.users;
};

const fetchPostsByUser = async (userId) => {
  const res = await axios.get(`${BASE_URL}/users/${userId}/posts`, { headers: HEADERS });
  return res.data.posts;
};

const fetchCommentsByPost = async (postId) => {
  const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, { headers: HEADERS });
  return res.data.comments;
};

module.exports = { fetchUsers, fetchPostsByUser, fetchCommentsByPost };
