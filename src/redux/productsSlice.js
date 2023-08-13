import { createSlice } from '@reduxjs/toolkit';
//import axios from 'src/utils/axios_remote';
//import _ from 'lodash';

//const API_ENDPOINT = process.env.REACT_APP_CORE_API;

const initialState = {
  products: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
    //const response = await axios.get(`${API_ENDPOINT}/products`);
    //const { data: requisitions } = response;
    const result =  [
        {id: '1234', type: 'Iron', price: '4.50', city: 'Minneapolis', stateAbr: 'MN'},
        {id: '4321', type: 'Steel', price: '6.50', city: 'Boston', stateAbr: 'MA'},
        {id: '8524', type: 'Gold', price: '2.00', city: 'Providence', stateAbr: 'RI'},
        {id: '6841', type: 'Nickel', price: '9.20', city: 'Orange County', stateAbr: 'CA'}
    ]
      state.products = result;
    },
    clearProducts: (state) => {
      state.products = null;
    },
    updateProduct: (state, action) => {
        const { id, type, price, city, stateAbr } = action.payload;


        const productIndex = state.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
          state.products[productIndex] = {
            ...state.products[productIndex],
            type,
            price,
            city,
            stateAbr,
          };
        }
      },
  },
});

export const { setProducts, clearProducts, updateProduct } = productsSlice.actions;

export default productsSlice.reducer;

/*export const getProductsReducer = () => async dispatch => {
    //const response = await axios.get(`${API_ENDPOINT}/products`);
    //const { data: requisitions } = response;
    const result =  [
        {id: '1234', type: 'Iron', price: '4.50', city: 'Minneapolis', state: 'MN'},
        {id: '4321', type: 'Steel', price: '6.50', city: 'Boston', state: 'MA'},
        {id: '8524', type: 'Gold', price: '2.00', city: 'Providence', state: 'RI'},
        {id: '6841', type: 'Nickel', price: '9.20', city: 'Orange County', state: 'CA'}
    ]
    dispatch(slice.actions.setProducts([...result]));
  };*/
