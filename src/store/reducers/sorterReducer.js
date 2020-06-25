import * as actionTypes from '../actions/actionTypes'

const initialState = {
   array: [],
   sorting: false,
   arraySize: 100,
   active: [],
   animationSpeed: 15
}

const setNewArray = (state, action) => {
   let array = [];
   for (let i = 0; i < state.arraySize; i++) {
      array.push(Math.floor(Math.random() * (state.arraySize - 4)) + 5);
   }
   return {...state, array} 
}

const setSorting = (state, action) => {
   return {...state, sorting: action.sorting}
}

const setActive = (state, action) => {
   return {...state, active: action.active}
}

const swapValues = (state, action) => {
   let array = [...state.array]
   let temp = array[action.index1]
   array[action.index1] = array[action.index2]
   array[action.index2] = temp
   return {...state, array}
}

const replaceValue = (state, action) => {
   let array = [...state.array]
   array[action.index] = action.value
   return {...state, array}
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_NEW_ARRAY:
         return setNewArray(state, action)
      case actionTypes.SET_SORTING:
         return setSorting(state, action)
      case actionTypes.SET_ACTIVE:
         return setActive(state, action)
      case actionTypes.SWAP_VALUES:
         return swapValues(state, action)
      case actionTypes.REPLACE_VALUE:
         return replaceValue(state, action)
      default:
         return state
   }
}


export default reducer;