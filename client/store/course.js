import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_COURSES = 'GET_COURSES'
const ADD_COURSES = 'ADD_COURSES'
const UPDATE_COURSES = 'UPDATE_COURSES'

/**
 * INITIAL STATE
 */
const defaultCourse = {
    byId: {
      0: {
        id: 0,
        name: 'Loading...'       
      }
    },
    allIds: []
  }

// ACTION CREATORS

const gotCourses = courses => ({
    type: GET_COURSES,
    courses
})

const addCourses = addCourse => ({
    type: ADD_COURSES,
    addCourse
})

const updateCourses = updatedCourse => ({
    type: UPDATE_COURSES,
    updatedCourse
})

export const getCourses = () => dispatch => {
    axios
        .get(`/api/courses`)
        .then(({ data }) => {
            console.log('data in get course', data)
            dispatch(gotCourses(data))
        }
        )
        .catch(error => console.error(error))
}

export const postCourse = newCourse => dispatch => {
    axios
        .post('/api/courses', newCourse)
        .then(({ data }) => {

            dispatch(addCourses(data))
            // history.push(`/product/${data.productId}#review_${data.id}`)
        }
        )
        .catch(error => console.error(error))
}

export const putCourseById = updateCourse => dispatch => {
    axios
        .put(`/api/courses/${updateCourse.id}`, updateCourse)
        .then(({ data }) => dispatch(updateCourses(data)))
        .catch(err => console.error(err))

}

// REDUCER

export default function (state = [], action) {
    switch (action.type) {
        case GET_COURSES:
        return {
          ...state,
          byId: action.courses.reduce((result, course) => {
            result[course.id] = course
            return result
          }, {}),
          allIds: action.courses.map(course => course.id)
        }
      case ADD_COURSES:
        return {
          ...state,
          byId: {...state.byId, [action.addCourse.id]: action.addCourse},
          allIds: [...state.allIds, action.addCourse.id]
        }
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

// export const getCourse = () => {
//     return dataJSON.reduce((total, amount) => {
//       Object.entries(amount.grades).forEach(course => {
//         if(course[0] === "className") {
//             total.push(course[1]);
//         }
//       })
//       return total
//     }, [])
//   }

for (var i = 0; i < dataJSON.length; i++) {
    dataJSON[i].grades.id = i+1;
    postCourse(dataJSON[i].grades.className)
}

export const getCourse = () => {
    var dataMap = [];
    for (var i = 0; i < dataJSON.length; i++) {
        dataMap.push({"id": i+1, "className": dataJSON[i].grades.className});
    }
    return dataMap;
}