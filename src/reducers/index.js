/**
 * reducers/index.js
 * author:          Kim Nejudne
 * description:     This is reducers index.js file,
 *                  reduers creators live here
 */

import { combineReducers } from 'redux';
/**
 * I import reducer as formReducer from redux-form
 * then I use the formReducer as 'form' state
 * this is related to form: "PostsNewForm" in PostsNew.js
 * if I want another form, I add a { form_2: formReducer } here
 * then I add a { form_2: "UniqueIdentifier" } on the component reduxForm helper
 */
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './PostsReducer';

const rootReducer = combineReducers({
  /**
   * I only need one posts state.
   * the post state is used by the posts list in the PostsIndex
   * PostsShow also uses posts state but only the particular post with the ID
   */
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
