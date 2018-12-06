import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DATA = 'GET_DATA'

/**
 * ACTION CREATORS
 */
const gotDatas = datas => ({type: GET_DATA, datas})

/**
 * THUNK CREATORS
 */
export const getDatas = () => dispatch => {
    axios
        .get(`/api/datas`)
        .then(({ data }) => {
          console.log('data********', data)
            dispatch(gotDatas(data))
        }
        )
        .catch(error => console.error(error))
}
/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_DATA:
      return action.datas
    default:
      return state
  }
}


// export const getAssignmentByAssignment = (state, categoryId) => {
//   return Object.values(state.assignmentCat.byId).reduce(
//     (result, assCat) => {
//       console.log('category of each id', assCat)
//       if (assCat.categoryId === categoryId) {
//         result.push(state.assignment.byId[assCat.assignmentId])
//       }
//       return result
//     },
//     []
//   )
// }

// export const getAvgAssignment = (state, categoryId) => {
//   return Object.values(state.assignmentCat.byId).reduce(
//     (total, amount) => {
 
//     if(amount.categoryId === categoryId) {
//       total = total + state.assignment.byId[amount.assignmentId].grade*state.assignment.byId[amount.assignmentId].gradeWeight;
     
//       return total;
//     }
//     return total;
//   }, 0)}

