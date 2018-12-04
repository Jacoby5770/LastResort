import axios from 'axios'
import history from '../history'
import { addAssignmentCat } from '../store'

// ACTION TYPES

const GET_ASSIGNMENTS = 'GET_ASSIGNMENTS'

const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'

const UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT'

/**
 * INITIAL STATE
 */
const defaultAssignments = {
  byId: {
    0: {
      id: 0,
      category: 'Loading...',
      grade: 0
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotAssignments = assignments => ({
  type: GET_ASSIGNMENTS,
  assignments
})

const addAssignment = addedAssignment => ({
  type: ADD_ASSIGNMENT,
  addedAssignment
})

const updateAssignment = updatedAssignment => ({
  type: UPDATE_ASSIGNMENT,
  updatedAssignment
})

// THUNK CREATORS

export const getAssignments= () => dispatch => {
  axios
    .get(`/api/assignments`)
    .then(({data}) => {
      dispatch(gotAssignments(data))
      console.log('assignment data', data)
    })
    .catch(error => console.error(error))
}

export const postAssignment = (newAssignment, categoryId) => dispatch => {
  axios
    .post('/api/assignments', {newAssignment, categoryId})
    .then(({data}) => {
      dispatch(addAssignment(data.assignment))
      dispatch(addAssignmentCat(data.assignmentCatItem))
    })
    .catch(error => console.error(error))
}

export const putAssignment = updatedAssignment => dispatch => {
  axios
    .put(`/api/assignments/${updatedAssignment.id}`, updatedAssignment)
    .then(({data}) => dispatch(updateAssignment(data)))
    .catch(err => console.error(err))
}

// REDUCER

export default function(state = defaultAssignments, action) {
  switch (action.type) {
    case GET_ASSIGNMENTS:
      return {
        ...state,
        byId: action.assignments.reduce((result, assignment) => {
          result[assignment.id] = assignment
          return result
        }, {}),
        allIds: action.assignments.map(assignment => assignment.id)
      }
    case ADD_ASSIGNMENT:
    console.log("trying to add", action.addedAssignment)
      return {
        ...state, 
        byId: {...state.byId, [action.addedAssignment.id]: action.addedAssignment
        },
        allIds: [...state.allIds, action.addedAssignment.id]
      }
    case UPDATE_ASSIGNMENT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.updatedAssignment.id]: action.updatedAssignment
        },
        allIds: [...state.allIds]
      }
    default:
      return state
  }
}

// SELECTORS

// export const getAvailableProducts = productsState => {
//   return productsState.allIds.reduce((result, id) => {
//     if (productsState.byId[id].inventory) result.push(productsState.byId[id])
//     return result
//   }, [])
// }

export const getAssignmentByAssignment = (state, categoryId) => {
  return Object.values(state.assignmentCat.byId).reduce(
    (result, assCat) => {
      console.log('category of each id', assCat)
      if (assCat.categoryId === categoryId) {
        result.push(state.assignment.byId[assCat.assignmentId])
      }
      return result
    },
    []
  )
}

export const getAvgAssignment = (state, categoryId) => {
  return Object.values(state.assignmentCat.byId).reduce(
    (total, amount) => {
 
    if(amount.categoryId === categoryId) {
      total = total + state.assignment.byId[amount.assignmentId].grade*state.assignment.byId[amount.assignmentId].gradeWeight;
     
      return total;
    }
    return total;
  }, 0)}

