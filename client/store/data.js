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

export const dataJSON = [
  {
  "grades": {
  "className": "KOR 1101-01-02 MERGE Elementary Korean I (2018F)"
  }
  },
  {
    "grades": {
      "className": "CS 3281-01 Principles Operating Systems I (2018F)",
  "Quiz 1": {
    "grade": "85 %",
  "total": "8.75",
  "achieved": "7.44"
  },
  "Assignment 3": {
    "grade": "100 %",
    "total": "10",
    "achieved": "10"
  },
  "Assignment 2": {
    "grade": "80 %",
    "total": null,
    "achieved": null
  },
  "Assignment 1": {
    "grade": "99 %",
    "total": "10",
    "achieved": "9.9"
  }
}
  },
  {
  "grades": {
  "Git Class Exercise" : {
    "grade": "A",
    "total": "10",
    "achieved": "10"
  },
  "className": "CS 4278-01 Prin of Software Engr (2018F)",
  "Quiz 9-13": {
    "grade": "C",
    "total": "10",
    "achieved": "2.67"
  },
  "Dev Env Asgn": {
    "grade": "A",
    "total": "10",
    "achieved": "10"
  },
  "Asgn 1": {
    "grade": "A",
    "total": "10",
    "achieved": "10"
  },
  "Asgn 3": {
    "grade": "A",
    "total": "10",
    "achieved": "10"
  },
  "Asgn 2": {
  "grade": "A",
  "total": "10",
  "achieved": "10"
  }
  }
  },
  {
  "grades": {
    "className": "CS 4959-01 Computer Science Project Sem (2018F)"
  }
  },
  {
  "grades": {
    "className": "CS 3250-02 Algorithms (2018F)"
  }
  }
  ]

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

