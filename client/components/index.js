/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllCourse} from './AllCourse'
export {default as SingleCourse} from './SingleCourse'
export {default as CourseForm} from './CourseForm'
export {default as AddCourse} from './AddCourse'
export {default as EditCourse} from './EditCourse'
export {Login, Signup} from './auth-form'

