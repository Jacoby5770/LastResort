import React from 'react'
import {AssignmentForm } from '../components'
import {postAssignment} from '../store'
import {connect} from 'react-redux'
import history from '../history'

class AddAssignment extends React.Component {
  submit = async addedAssignment => {

    const currentCategoryId = Number(this.props.match.params.categoryId)
    await this.props.postAssignment(addedAssignment, currentCategoryId)
    addedAssignment.categoryId = currentCategoryId
    history.push(`/category/${currentCategoryId}`)

  }

  render() {
    return <AssignmentForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postAssignment: async (newAssignment, categoryId) => dispatch(postAssignment(newAssignment, categoryId))
  }
}

export default connect(null, mapDispatchToProps)(AddAssignment)