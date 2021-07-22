import Axios from 'axios';
import * as cartConstants from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
   const { data } = await Axios.get(`/api/products/${id}`);
   dispatch({
      type: cartConstants.CART_ADD_ITEM,
      payload: {
         product: data._id,
         name: data.name,
         image: data.image,
         price: data.price,
         countInStock: data.countInStock,
         qty: qty,
      },
   });
   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (id) => async (dispatch, getState) => {
   dispatch({
      type: cartConstants.CART_REMOVE_ITEM,
      payload: {
         product: id,
      },
   });
   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddtedd = (data) => async (dispatch, getState) => {
   dispatch({
      type: cartConstants.CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
   });
   localStorage.setItem('cartItems', JSON.stringify(data));
};
