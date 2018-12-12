import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AssignmentByCategory = props => (
  <div className="row">
  {console.log('props in assignment', props)}
    {props.assignment.map(assignment => (
      <div key={assignment} className="col s12">
        <div className="card blue-grey">
          <div className="card-content white-text">
            <p className="flow-text" id={`assignment_${assignment.id}`}>
            {assignment}
            
            </p>
          </div>
  
        </div>
      </div>
    ))}
  </div>
)

export default connect(null)(AssignmentByCategory)