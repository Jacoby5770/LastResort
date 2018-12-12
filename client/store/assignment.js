import axios from 'axios'
import history from '../history'
import { addAssignmentCat, dataJSON } from '../store'

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
var letterMap = {
  'A+': 100,
  'A': 100,
  'B+': 88,
  'B': 85,
  'B-': 82,
  'C+': 78,
  'C': 75,
  'C-': 72,
  'D+': 68,
  'D': 65,
  'D-': 62,
  'F': 59
}
for (var i = 0; i < dataJSON.length; i++) {
  dataJSON[i].grades.id = i+1;
  for (var key in dataJSON[i].grades) {
    if (key === "className" || key === "id") {
      continue
    }
    console.log("HERE*******", key);
    var achieved = dataJSON[i].grades[key].achieved;
    var total = dataJSON[i].grades[key].total;
    if (achieved !== null && total !== null) {
      achieved = parseFloat(achieved);
      total = parseFloat(total);
      postAssignment({"category": key, "gradeWeight": total/100, "grade": achieved/total*100}, dataJSON[i].grades.id);
    } else {
      var classGrade = dataJSON[i].grades[key].grade;
      classGrade = classGrade.split(" ")[0];
      if (isNaN(parseFloat(classGrade))) {
        classGrade = letterMap[classGrade];
      } else {
        classGrade = parseFloat(classGrade);
      }
      postAssignment({"category": key, "gradeWeight": 0.1, "grade": classGrade}, dataJSON[i].grades.id);
    }
    
  }
}

export const getAssignmentByAssignment = (courseId) => {
  return dataJSON.reduce((total, amount) => {
    if(amount.grades.id === courseId) {
    Object.entries(amount.grades).forEach(course => {
      if(course[0] !== "className" && course[0] !== "id") {
        total.push(course[0]);
      }
    })
  }
    return total
  }, [])
}

export const getAvgAssignment = (state, courseId) => {
  return Object.values(state.assignmentCat.byId).reduce(
    (total, amount) => {
 
    if(amount.categoryId === courseId) {
      total = total + state.assignment.byId[amount.assignmentId].grade*state.assignment.byId[amount.assignmentId].gradeWeight;
     
      return total;
    }
    return total;
  }, 0)}

  export const getTotAssignment = (state, courseId) => {
    return Object.values(state.assignmentCat.byId).reduce(
      (total, amount) => {

        console.log('lknflknflk', state.assignment.byId[amount.assignmentId].gradeWeight)
   
      if(amount.categoryId === courseId) {
        console.log('lknflknflk', state.assignment.byId[amount.assignmentId].gradeWeight)
        total = total + state.assignment.byId[amount.assignmentId].gradeWeight*100;
       
        return total;
      }
      return total;
    }, 0)}
