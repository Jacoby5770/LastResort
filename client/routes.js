import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserHome, AllCourse, AddCourse, EditCourse, SingleCourse, SingleCategory, AssignmentByCategory, AddCategory, AddAssignment, AddBrightspace, EditAssignment } from './components'
import { me, getCourses, getCategories, getAssignments, getAssignmentCats, getDatas, getUsers } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      // <Switch>
      //   {/* Routes placed here are available to all visitors */}
      //   <Route path="/login" component={Login} />
      //   <Route path="/signup" component={Signup} />
      //   {isLoggedIn && (
      <Switch>
        {/* Routes placed here are only available after logging in */}
        <Route
          exact
          path="/category/:categoryId([0-9]*)"
          component={SingleCategory}
        />
        <Route exact path="/home" component={AllCourse} />
        <Route path="/welcome" component={UserHome} />
        <Route path="/course/add" component={AddCourse} />
        <Route path="/assignment/:categoryId/add" component={AddAssignment} />
        <Route path="/assignment/:categoryId/:assignmentId/edit" component={EditAssignment} />

        <Route path="/" component={AddBrightspace} />
        <Route path="/category/:courseId/add" component={AddCategory} />
        <Route path="/course/:courseId/edit" component={EditCourse} />
        {/* <Route exact path = "/category/:categoryName" component = {AssignmentByCategory}/> */}
        
        <Route
          exact
          path="/course/:courseId([0-9]*)"
          component={SingleCourse}
        />
      </Switch>

      //   )}
      //   {/* Displays our Login component as a fallback */}
      //   <Route component={Login} />
      // </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  console.log('dispatch in')
  return {
    async loadInitialData() {
      // await dispatch(getUsers())
      await dispatch(getCourses())
      await dispatch(getCategories())
      await dispatch(getAssignments())
      await dispatch(getAssignmentCats())
      await dispatch(getDatas())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
