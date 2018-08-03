import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_COURSES = 'GET_COURSES'
const ADD_COURSES = 'ADD_COURSES'
const UPDATE_COURSES = 'UPDATE_COURSES'

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
            return action.courses
        case ADD_COURSES:
            return [...state, action.addCourse]
        // case UPDATE_COURSES:
        //     return [...state.filter]
        default:
            return state
    }
}

