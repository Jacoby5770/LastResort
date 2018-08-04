import axios from 'axios'
import history from '../history'

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
    .then(({data}) => dispatch(gotAssignments(data)))
    .catch(error => console.error(error))
}

export const postAssignment = newAssignment => dispatch => {
  axios
    .post('/api/assignments', newAssignment)
    .then(({data}) => {
      dispatch(addAssignment(data))
    //   history.push(`/product/${data.id}`)
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
        byId: action.assignments.reduce((result, assignment) => {
          result[assignment.id] = assignment
          return result
        }, {}),
        allIds: action.assignments.map(assignment => assignment.id)
      }
    case ADD_ASSIGNMENT:
      return {
        byId: {...state.byId, [action.addedAssignment.id]: action.addedAssignment},
        allIds: [...state.allIds, action.addedAssignment.id]
      }
    case UPDATE_ASSIGNMENT:
      return {
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

// export const getAssignmentByAssignment = (assignmentState, assId) => {
//   return assignmentState.allIds.reduce(
//     (result, prodCat) => {
//       if (prodCat.categoryId === catId) {
//         result.push(state.products.byId[prodCat.productId])
//       }
//       return result
//     },
//     []
//   )
// }

// export const inventoryByProductId = (state, productId) =>
//   state.products.byId[productId].inventory

// export const getProductsBySearch = (productsState, productName) => {
//   return productsState.allIds.reduce((result, id) => {
//     if (productsState.byId[id].title.toLowerCase().indexOf(productName.toLowerCase()) >= 0 || productsState.byId[id].description.indexOf(productName.toLowerCase()) >= 0) 

//     result.push(productsState.byId[id])
//     return result
//   }, [])
// }