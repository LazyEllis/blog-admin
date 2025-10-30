const baseURL = import.meta.env.VITE_API_URL;

const request = async (endpoint, options = {}) => {
  const url = `${baseURL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw data.errors || new Error(data.message);
  }

  return data;
};

export const generateToken = (credentials) =>
  request("/auth/admin/token", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const getProfile = () => request("/users/me");

export const listPosts = () => request("/posts");

export const getPost = (id) => request(`/posts/${id}`);

export const getPostComments = (postId) => request(`/posts/${postId}/comments`);

export const createPostComment = ({ postId, commentData }) =>
  request(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });

export const updatePostComment = ({ postId, commentId, commentData }) =>
  request(`/posts/${postId}/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(commentData),
  });

export const deletePostComment = ({ postId, commentId }) =>
  request(`/posts/${postId}/comments/${commentId}`, { method: "DELETE" });
