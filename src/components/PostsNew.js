/**
 * PostsIndex.js
 * author:          Kim Nejudne
 * description:     This is the root '/post/new' component
 *                  component has form, user fills up form and submits,
 *                  submitted form is POSTed to the api
 */

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
  /**
   * this is what the Form component's component property is referencing
   * it takes a field paramter
   * it has field.meta object, which contains touched and error properties
   */
  renderField(field) {
    // destructuring field.meta.touched and field.meta.error so I can user touched and error.
    const { touched, error } = field.meta;
    /**
     * this is the conditional styling part
     * if the input is touched AND has error, then 'has-danger' class is added
     * otherwise, just form-group is added
     */
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    /**
     * this is the JSX that the Form component contains
     * field.label is taken from label="Title" property
     * {...field.input} probably spreads all the input properties from redux form into this input 
     * redux-form documentation uses "props" instead of "field"
     * "props" makes more sense because you're passing properties into an input element
     * when I removed {...field.input}, the validation no longer worked
     * touched and error are just shorthand for field.meta.touched and field.meta.error
     */
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit = (values) => {
    this.props.createPost(values, () => {
      // this callback will Route user to / after the POST request is successful
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    /**
     * I don't understand why I can't just say onSubmit(this.handleSubmit)
     * handleSubmit comes from this.props.handleSubmit which a props that comes from reduxForm
     */
    return (
      /**
       * Stephen Grider uses handleSubmit(this.onSubmit.bind(this))
       * he did this in order to handle "this"
       * I, however, just used arrow function to achieve the same effect
       * no more .bind(this)
       * then the function definition goes like onSubmit = (values) =>
       */
      <form onSubmit={handleSubmit(this.onSubmit)}>
        {/**
         * this is the Field component from redux-form
         * i think only the name and component property are required
         * component property references this.renderField
         * i wonder how the names become an object when submitted
         */}
        <Field label="Title" name="title" component={this.renderField} />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!this.props.valid}
        >
          Submit
        </button>
        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

/**
 * validate(values)
 * this is passed into the reduxForm connector at the bottom
 * this throws errors under the if conditions
 * it returns an errors object.
 * the errors object is empty if there are no errors.
 * if there is a single error, the form will throw an error.
 */
function validate(values) {
  const errors = {};

  // validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories";
  }

  if (!values.content) {
    errors.content = "Enter some content";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

/**
 * Over hear, I use reduxForm as helper of connect.
 * connect, in turn, is the helper of actionCreators and PostsNew
 */
export default reduxForm({
  validate,
  form: "PostsNewForm"
})(
  connect(
    null,
    { createPost }
  )(PostsNew)
);
