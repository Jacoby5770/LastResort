import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

// deprecated
let CategoryForm = props => {
    const { handleSubmit, pristine, submitting } = props
    return (
        <div className="container">
            <h3>Add/Edit Category</h3>
            <br />
            <form className="row" onSubmit={handleSubmit}>
                <div className="col s12 m6">
                    <Field name="category" component="input" type="text" />
                    <label htmlFor="category">Name of Category</label>
                </div>
                <div className="col s12  m6">
                    <Field name="gradeWeight" component="input" type="number" />
                    <label htmlFor="gradeWeight">
                        Grade Weighting (Decimal)
                    </label>
                    {/* <span className="helper-text">Cannot be empty, must be > 0</span> */}
                </div>
                <button
                    className="btn-floating btn-large waves-effect waves-light teal lighten-2"
                    disabled={pristine || submitting}
                    type="submit"
                >
                    Add
                    <i className="material-icons">add</i>

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
    initialValues: state.category.byId[match.params.categoryId]
})

CategoryForm = reduxForm({ form: 'categoryForm' })(CategoryForm)
CategoryForm = connect(mapStateToProps, mapDispatchToProps)(CategoryForm)

export default CategoryForm