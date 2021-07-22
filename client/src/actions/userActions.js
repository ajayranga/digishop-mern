import * as userConstants from '../constants/userConstants';
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
      dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: data });
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
      dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data });
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
         userLogin: { userInfo },
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

export const updateUserProfile = (user) => async (dispatch, getState) => {
   try {
      dispatch({ type: userConstants.USER_PROFILE_UPDATE_REQUEST });
      const {
         userLogin: { userInfo },
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
