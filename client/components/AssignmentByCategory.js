import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// individual assignments
const AssignmentByCategory = props => (
  <div className="row">
  {console.log('props in assignment', props)}
    {props.assignment.map(assignment => (
      <div key={assignment.id} className="col s12">
        <div className="card blue-grey">
        <Link
              to={`/assignment/${props.courseId}/${assignment.id}/edit`}
            >
          <div className="card-content white-text">

            <p className="flow-text" id={`assignment_${assignment.id}`}>
      
            {assignment.category}
            <br />
            {assignment.grade}
            </p>
            
          </div>
          </Link>

        </div>
      </div>
    ))}
  </div>
)

export default connect(null)(AssignmentByCategory)
