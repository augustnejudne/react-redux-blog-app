import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';

const URL = 'https://reduxblog.herokuapp.com/api';
const API_KEY = '?key=augustnejudne';

export function fetchPosts() {
  const request = axios.get(`${URL}/posts${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  }
}