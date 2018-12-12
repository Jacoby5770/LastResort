import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
// deprecated
export const Loading = () => {
  return (
    <div className="container">
        <br />
        <div className="row">
          <div className="col s12">
            <h5>Loading... (wait approx. 1 minute)</h5>
          </div>
        </div>
      </div>
  )
}

/**
 * CONTAINER
 */
export default connect()(Loading)

