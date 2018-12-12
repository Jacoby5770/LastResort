import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCourse, dataJSON } from '../store'

class AllCourse extends React.Component {
    render() {
        console.log('props in allcourse', this.props)
        return (
            <div className="container">
                <div className="row">
                <div className="col s12">
            <h5>Welcome, XXX!</h5>
            <h5>Your Current GPA is X.XX</h5>
          </div>
                    <div className="col s12 m6 push-m3 center-align">
                        <div className="collection center-align">
                        <br />
                            <Link
                                to="/brightspace/add"
                                className="teal lighten-2 waves-effect waves-light btn"

                            >
                                Get Grade Data
                                <i className="material-icons">add</i>

                            </Link>
                            
                            <br />
                            <br />
                            Here Are Your Enrolled Courses:

                            {this.props.course.map(individualCourse => (
                                <div key={individualCourse.id} className="collection center-align">
                                    <div className="flow-text truncate collection-item">
                                        <Link to={`/category/${individualCourse.id}`}>
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

