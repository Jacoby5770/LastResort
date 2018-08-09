import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AssignmentByCategory } from '../components'
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
                <AssignmentByCategory assignment={props.assignment} />
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const categoryId = Number(ownProps.match.params.categoryId)
    return {
        assignment: getAssignmentByAssignment(state, categoryId),
        category: state.category

        // isAdmin: !!state.user.admin
    }
}

export default connect(mapStateToProps)(SingleCategory)