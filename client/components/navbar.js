import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const LoggedInLinks = props => (
  <span>
    <li>
      <Link to="/">Home</Link>
    </li>
  </span>
)

const Navbar = props => (
  <div>
    <nav className="light-red lighten-1" role="navigation">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo logo-container">
          <i className="material-icons">store_mall_directory</i>
          <span className="flow-text truncate"> Last Resort </span>
        </Link>

        <ul className="right hide-on-med-and-down">
          <LoggedInLinks {...props} />
        </ul>
        <ul id="nav-mobile" className="sidenav">
          <LoggedInLinks {...props} />
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
  
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}