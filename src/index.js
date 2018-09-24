import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/PostsIndex';
import PostsNew from './components/PostsNew';
import PostsShow from './components/PostsShow';

/**
 * I use ReduxPromise as middleware
 */
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        {/* Make sure to put the root path at the bottom */}
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/posts/:id" component={PostsShow} />
        <Route path="/" component={PostsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
);
