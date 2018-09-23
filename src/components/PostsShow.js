import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const id = this.props.match.params.id;
      this.props.fetchPost(id, () => {
        console.log(this.props);
      });
    }
  }

  handleClick = () => {
    const id = this.props.match.params.id;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading pa...</div>;
    }

    return (
      <div>
        <Link to="/">Back to index</Link>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
        <button className="btn btn-danger" onClick={this.handleClick}>Delete</button>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}

export default connect(
  mapStateToProps,
  { fetchPost, deletePost }
)(PostsShow);
