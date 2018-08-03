import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let CourseForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div className="container">
      <h3>Add/Edit Course</h3>
      <br />
      <form className="row" onSubmit={handleSubmit}>
        <div className="col s12 input-field">
          <Field name="title" component="input" type="text" />
          <label htmlFor="title">Course Name</label>
        </div>
        <div className="col s12 m6 input-field">
          <Field name="goalGPA" component="input" type="number" />
          <label htmlFor="goalGPA">Goal GPA</label>
          {/* <span className="helper-text">Cannot be empty, must be > 0</span> */}
        </div>
        <div className="col s12 m6 input-field">
          <Field name="currentGPA" component="input" type="number" />
          <label htmlFor="currentGPA">
            Current GPA
          </label>
        </div>
        <button
          className="btn waves-effect waves-light"
          disabled={pristine || submitting}
          type="submit"
        >
          Submit
        </button>
      </form>
      {/* Hackish, needs to be rethought, but neccessary to keep materialize from
      blocking input with labels. see https://materializecss.com/text-inputs.html */}
      <script>
        {setTimeout(() => {
          // M.AutoInit()
          M.updateTextFields()
          M.textareaAutoResize(document.getElementById('description'))
        }, 1)}
      </script>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = (state, {match}) => ({
  // This `initialValues` variable name below is required by redux-forms
  //only for edit, if there is a id in the url
//   initialValues: state.course.byId[match.params.courseId]
})

CourseForm = reduxForm({form: 'courseForm'})(CourseForm)
CourseForm = connect(mapStateToProps, mapDispatchToProps)(CourseForm)

export default CourseForm