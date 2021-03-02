import axios from 'axios'
import history from '../history'

//ACTIONS TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//INITIAL STATE
const defaultProducts = {}

//ACTION CREATORS
const getActionProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const createActionProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

const deleteActionProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

// const updateActionProduct = (product) => {
//   return {
//     type: UPDATE_PRODUCT,
//     product,
//   }
// }

//THUNK CREATORS

export const getProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getActionProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createProduct = (product, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(createActionProduct(data))
      history.push('/products')
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteProduct = (product, history) => {
  return async dispatch => {
    try {
      await axios.delete('/api/products', product)
      dispatch(deleteActionProduct(product))
      history.push('/products')
    } catch (err) {
      console.log(err)
    }
  }
}

// export const updateProduct = (product, history) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.put(`/api/products/${product.id}`, product)
//       dispatch(updateActionProduct(data))
//       //ASSIGN CORRECT HISTORY PUSH METHOD HERE
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

//REDUCER

export default function productsReducer(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case CREATE_PRODUCT:
      return {...state, product: action.product}
    case DELETE_PRODUCT:
      return {
        ...state,
        product: state.products.filter(
          product => product.id !== action.product.id
        )
      }
    default:
      return state
  }
}
