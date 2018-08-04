import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import {
//     AllAssignment
// } from '../components'
// import { getProductsReviews } from '../store'
import { Button, Header, Modal } from 'semantic-ui-react'

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

// const mapStateToProps = (state, ownProps) => {
//     const productId = Number(ownProps.match.params.productId)
//     return {
//         product: state.products.byId[productId] || state.products.byId[0],
//         review: getProductsReviews(state.reviews, productId),
//         isAdmin: !!state.user.admin
//     }
// }

export default connect(null)(SingleCourse)