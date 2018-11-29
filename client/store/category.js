import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_CATEGORY = 'GET_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategories = {
    byId: {
      0: {
        id: 0,
        category: 'Loading...',
        grade: 0,
        course: 'Loading...'
      }
    },
    allIds: []
  }

// ACTION CREATORS

const gotCategories = categories => ({
    type: GET_CATEGORY,
    categories
})

const addCategories = addCategory => ({
    type: ADD_CATEGORY,
    addCategory
})


export const getCategories = () => dispatch => {
    axios
        .get(`/api/categories`)
        .then(({ data }) => {
     
            dispatch(gotCategories(data))
        }
        )
        .catch(error => console.error(error))
}

export const postCategory = newCategory => dispatch => {
    axios
        .post('/api/categories', newCategory)
        .then(({ data }) => {
            dispatch(addCategories(data))
            history.push(`/course/${data.courseId}`)
        }
        )
        .catch(error => console.error(error))
}

// REDUCER
export default function(state = defaultCategories, action) {
    switch (action.type) {
      case GET_CATEGORY:
        return {
          ...state,
          byId: action.categories.reduce((result, category) => {
            result[category.id] = category
            return result
          }, {}),
          allIds: action.categories.map(category => category.id)
        }
      case ADD_CATEGORY:
        return {
          ...state,
          byId: {...state.byId, [action.addCategory.id]: action.addCategory},
          allIds: [...state.allIds, action.addCategory.id]
        }
      default:
        return state
    }
  }

  export const getCategoriesByCourse = (categoryState, courseId) => {
    return categoryState.allIds.reduce(
      (result, categoryAllId) => {
        if (categoryState.byId[categoryAllId].courseId === courseId) {
          result.push(categoryState.byId[categoryAllId])
        }
        return result
      },
      []
    )
  }

  