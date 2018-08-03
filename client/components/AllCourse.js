import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Modal } from 'semantic-ui-react'

class AllCourse extends React.Component {
    render() {
        console.log('props in allcampis', this.props)
        return (
            <div className="row">
                {this.props.course.map(course => (
                    <Modal key = {course.id} trigger={<Button>Show {course.name}</Button>}>
                    <Modal.Header>Select Categories</Modal.Header>      
                      <Modal.Description>
                        <Header>{course.name}</Header>
                        <div>Here is your current GPA: {course.currentGPA}</div>
                        <div>Here is your goal GPA: {course.goalGPA}</div>
                        <br/>
                      </Modal.Description>
                  </Modal>
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

