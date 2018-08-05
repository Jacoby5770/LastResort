import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_CATEGORY = 'GET_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'

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
            console.log('data in category', data)
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
            // history.push(`/product/${data.productId}#review_${data.id}`)
        }
        )
        .catch(error => console.error(error))
}

// REDUCER

export default function (state = [], action) {
    switch (action.type) {
        case GET_CATEGORY:
            return action.categories
        case ADD_CATEGORY:
            return [...state, action.addCategory]
        default:
            return state
    }
}

