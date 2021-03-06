import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AssignmentByCategory } from '../components'
import { getAssignmentByAssignment, getAvgAssignment, getTotAssignment } from '../store'

const SingleCategory = props => {
    console.log('props in single category fegr', props)
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m6 push-m3 center-align">
                    <br />
                    <div className="collection center-align">
                    <br />
                    <br />
                    <div>Here is your current grade: {props.avgAssignment}/{props.totAssignment}</div>
                        <br />
                        <Link
                            to={`/assignment/${props.match.params.categoryId}/add`}
                            className="teal lighten-2 waves-effect waves-light btn"
                        >
                            Add Grade
                        <i className="material-icons">add</i>
                        <br />

                        </Link>
                        <AssignmentByCategory assignment={props.assignment} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const courseId = Number(ownProps.match.params.categoryId)
    console.log("state*********", courseId)
    return {
        assignment: getAssignmentByAssignment(state, courseId),
        category: state.category,
        avgAssignment: getAvgAssignment(state, courseId) || [],
        totAssignment: getTotAssignment(state, courseId) || []

        // isAdmin: !!state.user.admin
    }
}

export default connect(mapStateToProps)(SingleCategory)