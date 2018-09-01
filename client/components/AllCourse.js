import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AllCourse extends React.Component {
    render() {
        console.log('props in allcourse', this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 push-m3 center-align">
                        <div className="collection center-align">
                        Here Are Your Enrolled Courses:
                            <br />
                            <br />

                            <Link
                                to="/course/add"
                                className="teal lighten-2 waves-effect waves-light btn"

                            >
                                Add Course
                                <i className="material-icons">add</i>

                            </Link>
                            <br />
                            <br />

                            {this.props.course.map(individualCourse => (
                                <div key={individualCourse.id} className="collection center-align">
                                    <div className="flow-text truncate collection-item">
                                        <Link to={`/course/${individualCourse.id}`}>
                                            <div className="card-content black-text">
                                                {individualCourse.name}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // const productId = Number(ownProps.match.params.productId)
    console.log('state in all course', state)
    return {
        //   product: state.products.byId[productId] || state.products.byId[0],
        course: state.course
        //   isAdmin: !!state.user.admin
    }
}

export default connect(mapStateToProps, null)(AllCourse)

