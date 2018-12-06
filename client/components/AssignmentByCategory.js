import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AssignmentByCategory = props => (
  <div className="row">
  {console.log('props in assignment', props)}
    {props.assignment.map(assignment => (
      <div key={assignment.id} className="col s12">
        <div className="card blue-grey">
          <div className="card-content white-text">
          {/* <Link
              to={`/assignment/${props.courseId}/${assignment.id}/edit`}
              className="blue waves-effect right  waves-light btn"
            >
              Edit Grade
              <i className="material-icons right">edit</i>
            </Link> */}
            <p className="flow-text" id={`assignment_${assignment.id}`}>
      
            {assignment.category}
            <br />
            {assignment.grade}
            </p>
            
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default connect(null)(AssignmentByCategory)
