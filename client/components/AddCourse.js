import React from 'react'
import {CourseForm} from '../components'
import {postCourse} from '../store'
import {connect} from 'react-redux'

class AddCourse extends React.Component {
  submit = addedCourse => {
    this.props.postCourse(addedCourse)
    //this will redirect to the thunk id
  }

  render() {
    return <CourseForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postCourse: newCourse => dispatch(postCourse(newCourse))
  }
}

export default connect(null, mapDispatchToProps)(AddCourse)
