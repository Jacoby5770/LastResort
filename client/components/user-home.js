import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, gpa, email} = props

  return (
    <div className="container">
        <br />
        <div className="row">
          <div className="col s12">
            <h5>Welcome, {firstName || email}!</h5>
            <h5>Your Current GPA is {gpa}</h5>
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
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
