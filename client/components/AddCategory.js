import React from 'react'
import {CategoryForm} from '../components'
import {postCategory} from '../store'
import {connect} from 'react-redux'

// deprecated because category not useful
class AddCategory extends React.Component {
  submit = addedCategory => {
    const currentCourseId = Number(this.props.match.params.courseId)
    addedCategory.courseId = currentCourseId
    this.props.postCategory(addedCategory)
  }

  render() {
    return <CategoryForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postCategory: newCategory => dispatch(postCategory(newCategory))
  }
}

export default connect(null, mapDispatchToProps)(AddCategory)