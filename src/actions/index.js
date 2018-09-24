/**
 * actions/index.js
 * author:          Kim Nejudne
 * description:     This is actions index.js file,
 *                  actions creators live here
 */

import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST'; // create post
export const FETCH_POST = 'FETCH_ONE_POST';
export const DELETE_POST = 'DELETE_POST';

const URL = 'https://reduxblog.herokuapp.com/api';
const API_KEY = '?key=augustnejudne';

/**
 * fetchPosts action creator
 * fetches all posts from the API
 * uses axios.get()
 * @param {callback executes when the promise is resolved} callback
 */
export function fetchPosts(callback) {
  const request = axios.get(`${URL}/posts${API_KEY}`);
  request.then(() => callback());
  return {
    type: FETCH_POSTS,
    payload: request
  }
}

/**
 * @param {receives an object to be posted to the API} post 
 * @param {callback executes when the promise is resolved} callback 
 * uses axios.post()
 */
export function createPost(post, callback) {
  /**
   * axios.post takes two parameters,
   * the URL and the object to be posted
   */
  const request = axios.post(`${URL}/posts${API_KEY}`, post)
    .then(() => callback());
  return {
    type: CREATE_POST,
    payload: request
  }
}

/**
 * @param {takes id of a particular post} id 
 * @param {same as other callbacks} callback 
 * this is to be used by the PostsIndex.
 * user clicks on the title and is taken to a view where he sees the details of the title
 */
export function fetchPost(id, callback) {
  const request = axios.get(`${URL}/posts/${id}${API_KEY}`)
  request.then(() => callback());
  return {
    type: FETCH_POST,
    payload: request
  }
}

/**
 * @param {deletes a post with this id} id 
 * @param {same as other callbacks} callback 
 */
export function deletePost(id, callback) {
const request = axios.delete(`${URL}/posts/${id}${API_KEY}`);
request.then(() => callback());
return {
  type: DELETE_POST,
  payload: id
  }
}