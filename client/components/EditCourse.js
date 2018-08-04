import React from 'react'
import {CourseForm} from '../components'
import {putCourseById} from '../store'
import {connect} from 'react-redux'

class EditCourse extends React.Component {
  submit = editedCourse => {
    this.props.putCourseById(editedCourse)
    // this.props.history.push(`/product/${this.props.match.params.productId}`)
  }
  render() {
    return <CourseForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => ({
  putCourseById: course => dispatch(putCourseById(course))
})

export default connect(null, mapDispatchToProps)(EditCourse)
