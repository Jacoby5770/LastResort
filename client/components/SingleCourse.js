import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AllCategory } from '../components'
import { getCategoriesByCourse } from '../store'


const SingleCourse = props => {
    console.log('props in single course', props)
    const { course } = props

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m6 push-m3 center-align">
                    <br />
                    <div className="collection center-align" key={course.id}>
                        <br />
                        {course.name}
                        <br />
                        <div>Here is your goal GPA: {course.goalGPA}</div>
                        <br />
                        
                        <Link
                        to={`/category/${course.id}/add`}
                        className="teal lighten-2 waves-effect waves-light btn"
                    >
                        Add Category
                        <i className="material-icons">add</i>

                    </Link>

                        <AllCategory category={props.category} course={props.course} />
                    </div>
                </div>
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
        course: state.course[courseId - 1]
        // isAdmin: !!state.user.admin
    }
}

export default connect(mapStateToProps)(SingleCourse)