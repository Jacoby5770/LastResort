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
            <h5>Welcome, Kevin Zhang!</h5>
            <h5>Your Current GPA is 3.74</h5>
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
                                <div key={individualCourse} className="collection center-align">
                                    <div className="flow-text truncate collection-item">
                                        <Link to={`/category/${individualCourse}`}>
                                            <div className="card-content black-text">
                                                {individualCourse}
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
    

    const dataJSON = [
        {
        "grades": {
        "className": "KOR 1101-01-02 MERGE Elementary Korean I (2018F)"
        }
        },
        {
          "grades": {
            "className": "CS 3281-01 Principles Operating Systems I (2018F)",
        "Quiz 1": {
          "grade": "85 %",
        "total": "8.75",
        "achieved": "7.44"
        },
        "Assignment 3": {
          "grade": "100 %",
          "total": "10",
          "achieved": "10"
        },
        "Assignment 2": {
          "grade": "80 %",
          "total": null,
          "achieved": null
        },
        "Assignment 1": {
          "grade": "99 %",
          "total": "10",
          "achieved": "9.9"
        }
      }
        },
        {
        "grades": {
        "Git Class Exercise" : {
          "grade": "A",
          "total": "10",
          "achieved": "10"
        },
        "className": "CS 4278-01 Prin of Software Engr (2018F)",
        "Quiz 9-13": {
          "grade": "C",
          "total": "10",
          "achieved": "2.67"
        },
        "Dev Env Asgn": {
          "grade": "A",
          "total": "10",
          "achieved": "10"
        },
        "Asgn 1": {
          "grade": "A",
          "total": "10",
          "achieved": "10"
        },
        "Asgn 3": {
          "grade": "A",
          "total": "10",
          "achieved": "10"
        },
        "Asgn 2": {
        "grade": "A",
        "total": "10",
        "achieved": "10"
        }
        }
        },
        {
        "grades": {
          "className": "CS 4959-01 Computer Science Project Sem (2018F)"
        }
        },
        {
        "grades": {
          "className": "CS 3250-02 Algorithms (2018F)"
        }
        }
        ]

    return {
        //   product: state.products.byId[productId] || state.products.byId[0],
        course: getCourse(dataJSON)
        //   isAdmin: !!state.user.admin
    }
}

export default connect(mapStateToProps, null)(AllCourse)

