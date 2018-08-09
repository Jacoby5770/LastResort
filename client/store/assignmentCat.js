import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_ASSIGNMENTCATS = 'GET_ASSIGNMENTCATS'

/**
 * INITIAL STATE
 */
const defaultAssignmentCats = {
  byId: {
    0: {
      id: 0,
      assignmentId: 0,
      categoryId: 0
    }
  },
  allIds: []
}

// ACTION CREATORS

const gotAssignmentCats = assCats => {
  return {
    type: GET_ASSIGNMENTCATS,
    assCats
  }
}

// THUNK CREATORS

export const getAssignmentCats = () => dispatch => {
  axios
    .get('/api/assignmentCats')
    .then(({data}) => {
      dispatch(gotAssignmentCats(data))
    })
    .catch(error => console.error(error))
}

// REDUCER

export default function(state = defaultAssignmentCats, action) {
  switch (action.type) {
    case GET_ASSIGNMENTCATS:
      return {
        byId: action.assCats.reduce((result, assCat) => {
          result[assCat.id] = assCat
          return result
        }, {}),
        allIds: action.assCats.map(assCat => assCat.id)
      }
    default:
      return state
  }
}