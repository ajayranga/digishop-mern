import * as productConstants from '../constants/productConstants';
import Axios from 'axios';

export const listProducts = () => async (dispatch) => {
   try {
      dispatch({ type: productConstants.PRODUCT_LIST_REQUEST });
      const { data } = await Axios.get('/api/products/');
      dispatch({ type: productConstants.PRODUCT_LIST_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: productConstants.PRODUCT_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const fetchProduct = (id) => async (dispatch) => {
   try {
      dispatch({ type: productConstants.PRODUCT_FETCH_REQUEST });
      const { data } = await Axios.get('/api/products/' + id);
      dispatch({ type: productConstants.PRODUCT_FETCH_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: productConstants.PRODUCT_FETCH_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: productConstants.PRODUCT_DELETE_REQUEST });
      const {
         user: { userInfo },
      } = getState();
      const headers = {
         headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await Axios.delete('/api/products/' + id, headers);
      dispatch({
         type: productConstants.PRODUCT_DELETE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: productConstants.PRODUCT_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const createProduct = () => async (dispatch, getState) => {
   try {
      dispatch({ type: productConstants.PRODUCT_CREATE_REQUEST });
      const {
         user: { userInfo },
      } = getState();
      const headers = {
         headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await Axios.post('/api/products/', {}, headers);
      dispatch({
         type: productConstants.PRODUCT_CREATE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: productConstants.PRODUCT_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
