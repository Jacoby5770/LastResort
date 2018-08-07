import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AllCourse extends React.Component {
    render() {
        console.log('props in allcourse', this.props)
        return (
            <div className="row">
                <Link
                    to="/course/add"
                >
                    Add Course
            </Link>
                {this.props.course.map(individualCourse => (
                    <Link key={individualCourse.id} to={`/course/${individualCourse.id}`}>
                        <div className="card-content">
                            {individualCourse.name}
                        </div>
                    </Link>
                ))}
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

