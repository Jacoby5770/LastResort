import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AllAssignment } from '../components'
import { getAssignmentByAssignment } from '../store'

const SingleCategory = props => {
    console.log('props in single category fegr', props)
    const { category } = props

    return (
        <div className="container">
            {console.log('props in single category fegr', props)
            }
            <br />
            <div key={category.id}>
                <AllAssignment assignment={props.assignment} />
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const categoryName = Number(ownProps.match.params.categoryName)
    return {
        assignment: getAssignmentByAssignment(state.assignment, categoryName),
        category: state.category

        // isAdmin: !!state.user.admin
    }
}

export default connect(mapStateToProps)(SingleCategory)