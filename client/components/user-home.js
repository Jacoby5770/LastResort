import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
// deprecated
export const UserHome = props => {
  console.log('userhome props', props)
  const {firstName, lastName, gpa} = props

  return (
    <div className="container">
        <br />
        <div className="row">
          <div className="col s12">
            <h5>Welcome, Kevin Zhang!</h5>
            <h5>Your Current GPA is 3.74</h5>
          </div>
        </div>
      </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    gpa: state.user.gpa,
    lastName: state.user.lastName
    }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
