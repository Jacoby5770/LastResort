import React from 'react'
import {CourseForm} from '../components'
import {postCourse} from '../store'
import {connect} from 'react-redux'
import history from '../history'

// add individual course 
class AddCourse extends React.Component {
  submit = async addedCourse => {
    await this.props.postCourse(addedCourse)
    history.push(`/home`)
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
