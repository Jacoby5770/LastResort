import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const AllAssignment = props => (
  <div className="row">
    {props.review.map(review => (
      <div key={review.id} className="col s12">
        <div className="card blue-grey">
        //assignment
          <div className="card-content white-text">
            <p className="flow-text" id={`review_${review.id}`}>
              {review.body}
            </p>
          </div>
          //quiz
          <div className="card-content white-text">
            <p className="flow-text" id={`review_${review.id}`}>
              {review.body}
            </p>
          </div>
          //exam
          <div className="card-content white-text">
            <p className="flow-text" id={`review_${review.id}`}>
              {review.body}
            </p>
          </div>
          //finalexam
          <div className="card-content white-text">
            <p className="flow-text" id={`review_${review.id}`}>
              {review.body}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default connect(null, null)(AllAssignment)
