  export const RESET_STATE = 'RESET_STATE';
  export const SET_PRODUCTS = 'SET_PRODUCTS';

  export const resetState = () => ({
    type: RESET_STATE,
  });

  export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
  });
