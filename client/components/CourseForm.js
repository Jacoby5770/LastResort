import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

let CourseForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <div>
      <h3>Add/Edit Course</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="col s12 m6">
          <Field name="name" component="input" type="text" />
          <label htmlFor="name">Course Name</label>
        </div>
        <div className="col s12 m6">
          <Field name="goalGPA" component="input" type="number" />
          <label htmlFor="goalGPA">Goal GPA</label>
          {/* <span className="helper-text">Cannot be empty, must be > 0</span> */}
        </div>
        <button
        className="btn-floating btn-large waves-effect waves-light teal lighten-2"
          disabled={pristine || submitting}
          type="submit"
        >
          Add
        </button>
      </form>
      {/* Hackish, needs to be rethought, but neccessary to keep materialize from
      blocking input with labels. see https://materializecss.com/text-inputs.html */}
      {/* <script>
        {setTimeout(() => {
          // M.AutoInit()
          M.updateTextFields()
          M.textareaAutoResize(document.getElementById('description'))
        }, 1)}
      </script> */}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = (state, {match}) => ({
  // This `initialValues` variable name below is required by redux-forms
  //only for edit, if there is a id in the url
  initialValues: state.course
})

CourseForm = reduxForm({form: 'courseForm'})(CourseForm)
CourseForm = connect(mapStateToProps, mapDispatchToProps)(CourseForm)

export default CourseForm