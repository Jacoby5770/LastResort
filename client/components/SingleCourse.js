import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import {
//     AllAssignment
// } from '../components'
// import { getProductsReviews } from '../store'
import { Button, Header, Modal } from 'semantic-ui-react'
import { AllCategory } from '../components'

const SingleCourse = props => {
    console.log('props in single course', props)
    const { course } = props

    return (
        <div className="container">
            <br />
            <Modal key={course.id} trigger={<Button>Show {course.name}</Button>}>
                <Modal.Header>
                    {course.name}
                </Modal.Header>
                <br />
                <Modal.Description>
                    <div>Here is your current GPA: {course.currentGPA}</div>
                    <div>Here is your goal GPA: {course.goalGPA}</div>
                    <br />
                    <Link
                        to="/category/add"
                    >
                        Add Category
                    </Link>
                    <AllCategory category={props.category} />
                </Modal.Description>
            </Modal>
            <div className="col s12">
                {/* <Link
                    to={`review/${props.match.params.productId}/add`}
                    className="waves-effect green darken-2 waves-light btn"
                >
                    Login to Rate and Review
          <i className="material-icons right">rate_review</i>
                </Link>
                <AllReviews review={props.review} /> */}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {

        category: state.category
        // isAdmin: !!state.user.admin
    }
}

export default connect(mapStateToProps)(SingleCourse)