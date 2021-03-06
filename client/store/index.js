import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import course from './course'
import assignment from './assignment'
import category from './category'
import assignmentCat from './assignmentCat'
import {reducer as formReducer} from 'redux-form'

const reducer = combineReducers({
  user,
  course,
  assignment,
  category,
  assignmentCat,
  form: formReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './course'
export * from './category'
export * from './assignment'
export * from './assignmentCat'


