import * as userConstants from '../constants/userConstants';
import * as orderConstants from '../constants/orderConstants';
import Axios from 'axios';

export const loginUser = (email, password) => async (dispatch) => {
   try {
      const headers = {
         headers: { 'Content-Type': 'Application/json' },
      };
      dispatch({ type: userConstants.USER_LOGIN_REQUEST });
      const { data } = await Axios.post(
         '/api/user/login',
         { email, password },
         headers
      );
      dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: userConstants.USER_LOGIN_FAILED,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
export const logoutUser = () => async (dispatch) => {
   localStorage.removeItem('userInfo');
   dispatch({ type: orderConstants.ORDER_PAY_RESET });
   dispatch({ type: orderConstants.ORDER_MYORDERS_RESET });
   dispatch({ type: orderConstants.ORDER_CREATE_RESET });
   dispatch({ type: userConstants.USER_LIST_RESET });
   dispatch({ type: userConstants.USER_LOGOUT });
};

export const registerUser = (name, email, password) => async (dispatch) => {
   try {
      const headers = {
         headers: { 'Content-Type': 'Application/json' },
      };
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });
      const { data } = await Axios.post(
         '/api/user/',
         { name, email, password },
         headers
      );
      dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: userConstants.USER_REGISTER_FAILED,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const getUserProfile = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_PROFILE_REQUEST });
      const {
         user: { userInfo },
      } = getState();
      const headers = {
         headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await Axios.get('/api/user/' + id, headers);
      dispatch({ type: userConstants.USER_PROFILE_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: userConstants.USER_PROFILE_FAILED,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
export const getUsersList = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_LIST_REQUEST });
      const {
         user: { userInfo },
      } = getState();
      const headers = {
         headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await Axios.get('/api/user', headers);
      dispatch({ type: userConstants.USER_LIST_SUCCESS, payload: data });
   } catch (error) {
      dispatch({
         type: userConstants.USER_LIST_FAILED,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_PROFILE_UPDATE_REQUEST });
      const {
         user: { userInfo },
      } = getState();
      const headers = {
         headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await Axios.put('/api/user/profile', user, headers);
      dispatch({
         type: userConstants.USER_PROFILE_UPDATE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: userConstants.USER_PROFILE_UPDATE_FAILED,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_DELETE_REQUEST });
      const {
         user: { userInfo },
      } = getState();
      const headers = {
         headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await Axios.delete('/api/user/' + userId, headers);
      dispatch({
         type: userConstants.USER_DELETE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: userConstants.USER_DELETE_FAILED,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const updateUserByAdmin = (user) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_UPDATE_REQUEST });
      const {
         user: { userInfo },
      } = getState();
      const headers = {
         headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await Axios.put(`/api/user/${user.id}`, user, headers);
      dispatch({
         type: userConstants.USER_UPDATE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: userConstants.USER_UPDATE_FAILED,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
