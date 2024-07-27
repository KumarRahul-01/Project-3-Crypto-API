import { RESET_STATE, SET_PRODUCTS } from './actions';

const initialState = {
  products: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
