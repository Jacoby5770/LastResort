import React from 'react'
import {CategoryForm} from '../components'
import {postCategory} from '../store'
import {connect} from 'react-redux'

class AddCategory extends React.Component {
  submit = addedCategory => {
    console.log('added cateogyr before', addedCategory)
    console.log('props in add cateogry', this.props)
    const currentCourseId = Number(this.props.match.params.courseId)
    addedCategory.courseId = currentCourseId
    console.log('added cateogyr after', addedCategory)
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