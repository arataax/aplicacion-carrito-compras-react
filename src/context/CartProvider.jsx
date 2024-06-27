import { useReducer } from 'react'
import { CartContext } from '../context/CartContext'

export const CartProvider = ({ children }) => {

  const initialState = []

  const cartReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case '[cart] Add Product':
        return [...state, action.payload]
      case '[cart] Remove Product':
        return state.filter(product => product.id !== action.payload)
      case '[cart] Increment Quantity':
        return state.map(product => {
          const cant = product.quantity + 1
          if (product.id === action.payload) return { ...product, quantity: cant }
          return product
        })
      case '[cart] Decrement Quantity':
        return state.map(product => {
          const cant = product.quantity - 1
          if (product.id === action.payload && product.quantity > 1) return { ...product, quantity: cant }
          return product
        })
      default:
        return state
    }
  }

  const [shoppingList, dispatch] = useReducer(cartReducer, initialState)

  const addProduct = (product) => {
    product.quantity = 1
    const action = {
      type: '[cart] Add Product',
      payload: product
    }
    dispatch(action)
  }
  const removeProduct = (id) => {
    const action = {
      type: '[cart] Remove Product',
      payload: id
    }
    dispatch(action)
  }
  const incrementQuantity = (id) => {
    const action = {
      type: '[cart] Increment Quantity',
      payload: id
    }
    dispatch(action)
  }
  const decrementQuantity = (id) => {
    const action = {
      type: '[cart] Decrement Quantity',
      payload: id
    }
    dispatch(action)
  }

  return (
    <CartContext.Provider value={{ shoppingList, addProduct, removeProduct, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  )
}
