import React from 'react'
import {BrightspaceForm} from '../components'
// import {postCategory} from '../store'
import {connect} from 'react-redux'
import history from '../history'

// deprecated because we made requests to server for brightspace information
class AddBrightspace extends React.Component {
  submit = addedBrightspace => {
    // const currentCourseId = Number(this.props.match.params.courseId)
    // addedCategory.courseId = currentCourseId
    // this.props.postCategory(addedCategory)
    history.push(`/home`)
  }

  render() {
    return <BrightspaceForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postCategory: newCategory => dispatch(postCategory(newCategory))
  }
}

export default connect(null, mapDispatchToProps)(AddBrightspace)