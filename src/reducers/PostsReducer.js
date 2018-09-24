/**
 * reducers/index.js
 * author:          Kim Nejudne
 * description:     This is PostsReducer reducer,
 *                  I use lodash here.
 *                  lodash is awesome
 */

import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      return action.error ? state : { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      /**
       * _.mapKeys creates an object from the action.payload.data where the keys of each element is the element.id
       */
      return action.error ? state : _.mapKeys(action.payload.data, 'id');
    case DELETE_POST:
      /**
       * _.omit removes the second argument (which is an element) from the first argument (which is an object)
       */
      return _.omit(state, action.payload);
    default:
      return state;
  }
}