
import React from 'react'
import {AssignmentForm} from '../components'
import {putAssignment} from '../store'
import {connect} from 'react-redux'

// edit assignment class
class EditAssignment extends React.Component {
  submit = editedAsg => {
    this.props.putAssignment(editedAsg)
    this.props.history.push(`/category/${this.props.match.params.categoryId}`)
  }
  render() {
    return <AssignmentForm {...this.props} onSubmit={this.submit} />
  }
}

const mapDispatchToProps = dispatch => ({
    putAssignment: food => dispatch(putAssignment(food))
})

export default connect(null, mapDispatchToProps)(EditAssignment)
