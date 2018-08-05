import React from 'react'
import {CategoryForm} from '../components'
import {postCourse} from '../store'
import {connect} from 'react-redux'

class AddCourse extends React.Component {
  submit = addedCourse => {
    this.props.postCourse(addedCourse)
  }

  render() {
    return <CategoryForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postCourse: newCourse => dispatch(postCourse(newCourse))
  }
}

export default connect(null, mapDispatchToProps)(AddCourse)
