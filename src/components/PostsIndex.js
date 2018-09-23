/**
 * PostsIndex.js
 * author:          Kim Nejudne
 * description:     This is the root '/' component
 */

import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, deletePost } from "../actions";

class PostsIndex extends Component {
  /**
   * code written inside the componentDidMount lifecycle hook
   * executes after the component renders
   */
  componentDidMount() {
    /**
     * if there is no post state loaded
     * call the fetchPosts action creator
     */
    if (!this.props.posts) {
      this.props.fetchPosts();
    }
  }

  // this function renders the fetched posts
  renderPosts() {
    /**
     * here we're using the lodash map method to map through our posts state
     * we're using lodash map method because our posts state is an object
     * the map method takes two arguments: the object and a callback function.
     */
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          {/**
           * Link component imported from react-router-dom,
           * takes a required parametor of 'to' which is a path
           */}
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          {
            /**
             * delete button
             * calls the deletePost action creator
             */
          }
          <button
            className="close"
            onClick={() => this.props.deletePost(post.id)}
          >
            <span>&times;</span>
          </button>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        {/* renderPosts called */}
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost }
)(PostsIndex);
