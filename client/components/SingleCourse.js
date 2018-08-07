import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AllCategory } from '../components'
import { getCategories, getCategoriesByCourse } from '../store'

const SingleCourse = props => {
    console.log('props in single course', props)
    const { course } = props

    return (
        <div className="container">
            <br />
            <div key={course.id}>
                {course.name}
                <br />
                <div>Here is your current GPA: {course.currentGPA}</div>
                <div>Here is your goal GPA: {course.goalGPA}</div>
                <br />
                <AllCategory category={props.category} course = {props.course}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const courseId = Number(ownProps.match.params.courseId)
    console.log('own props in single soruce', courseId)
    console.log('course in single soruce', state.course)
    return {
        category: getCategoriesByCourse(state.category, courseId),
        course: state.course[courseId-1]
        // isAdmin: !!state.user.admin
    }
}

export default connect(mapStateToProps)(SingleCourse)