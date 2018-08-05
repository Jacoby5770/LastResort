import React from 'react'
import {CourseForm} from '../components'
import {postCategory} from '../store'
import {connect} from 'react-redux'

class AddCategory extends React.Component {
  submit = addedCategory => {
    this.props.postCategory(addedCategory)
  }

  render() {
    return <CourseForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postCategory: newCategory => dispatch(postCategory(newCategory))
  }
}

export default connect(null, mapDispatchToProps)(AddCategory)
