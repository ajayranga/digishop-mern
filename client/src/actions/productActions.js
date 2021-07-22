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
