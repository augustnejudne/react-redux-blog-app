import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST'; // create post
export const FETCH_POST = 'FETCH_ONE_POST';
export const DELETE_POST = 'DELETE_POST';

const URL = 'https://reduxblog.herokuapp.com/api';
const API_KEY = '?key=augustnejudne';

export function fetchPosts(callback) {
  const request = axios.get(`${URL}/posts${API_KEY}`);
  request.then(() => callback());
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

// create post
export function createPost(post, callback) {
  const request = axios.post(`${URL}/posts${API_KEY}`, post)
    .then(() => callback());
  return {
    type: CREATE_POST,
    payload: request
  }
}
// create post

// post show
export function fetchPost(id, callback) {
  const request = axios.get(`${URL}/posts/${id}${API_KEY}`)
  request.then(() => callback());
  return {
    type: FETCH_POST,
    payload: request
  }
}
// post show

// delete post
export function deletePost(id, callback) {
  const request = axios.delete(`${URL}/posts/${id}${API_KEY}`);
  request.then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  }
}