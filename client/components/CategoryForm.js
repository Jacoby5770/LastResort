import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

let CourseForm = props => {
    const { handleSubmit, pristine, submitting } = props
    return (
        <div>
            <h3>Add/Edit Category</h3>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="category" component="input" type="text" />
                    <label htmlFor="category">Name of Category</label>
                </div>
                <div>
                    <Field name="gradeWeight" component="input" type="number" />
                    <label htmlFor="gradeWeight">
                        Grade Weighting
          </label>
                    {/* <span className="helper-text">Cannot be empty, must be > 0</span> */}
                </div>
                <div>
                    <Field name="totalQuantity" component="input" type="number" />
                    <label htmlFor="totalQuantity">
                        Number of {props.initialValues.category}
          </label>
                </div>
                <button
                    disabled={pristine || submitting}
                    type="submit"
                >
                    Submit
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

const mapStateToProps = (state, { match }) => ({
    // This `initialValues` variable name below is required by redux-forms
    //only for edit, if there is a id in the url
    initialValues: state.category
})

CourseForm = reduxForm({ form: 'courseForm' })(CourseForm)
CourseForm = connect(mapStateToProps, mapDispatchToProps)(CourseForm)

export default CourseForm