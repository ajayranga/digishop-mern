import * as userConstants from '../constants/userConstants';

export const userLoginReducer = (
   state = {
      userInfo: localStorage.getItem('userInfo')
         ? JSON.parse(localStorage.getItem('userInfo'))
         : {},
      loading: false,
      error: null,
   },
   action
) => {
   switch (action.type) {
      case userConstants.USER_LOGIN_REQUEST:
         return { ...state, userInfo: {}, loading: true };
      case userConstants.USER_LOGIN_SUCCESS:
         return { ...state, userInfo: action.payload, loading: false };
      case userConstants.USER_LOGIN_FAILED:
         return {
            ...state,
            userInfo: {},
            error: action.payload,
            loading: false,
         };
      case userConstants.USER_LOGOUT:
         return { ...state, userInfo: {}, error: null, loading: false };
      default:
         return state;
   }
};

export const userRegisterReducer = (
   state = {
      userInfo: localStorage.getItem('userInfo')
         ? JSON.parse(localStorage.getItem('userInfo'))
         : {},
      loading: false,
      error: null,
   },
   action
) => {
   switch (action.type) {
      case userConstants.USER_REGISTER_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_REGISTER_SUCCESS:
         return { ...state, userInfo: action.payload, loading: false };
      case userConstants.USER_REGISTER_FAILED:
         return { ...state, error: action.payload, loading: false };
      default:
         return state;
   }
};

export const userProfileReducer = (
   state = { user: {}, loading: false, error: null },
   action
) => {
   switch (action.type) {
      case userConstants.USER_PROFILE_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_PROFILE_SUCCESS:
         return { ...state, user: action.payload, loading: false };
      case userConstants.USER_PROFILE_FAILED:
         return { ...state, error: action.payload, loading: false };
      default:
         return state;
   }
};

export const userProfileUpdateReducer = (
   state = { userInfo: {}, loading: false, error: null, success: false },
   action
) => {
   switch (action.type) {
      case userConstants.USER_PROFILE_UPDATE_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_PROFILE_UPDATE_SUCCESS:
         return {
            ...state,
            success: true,
            userInfo: action.payload,
            loading: false,
         };
      case userConstants.USER_PROFILE_UPDATE_FAILED:
         return { ...state, error: action.payload, loading: false };
      // case userConstants.USER_PROFILE_UPDATE_RESET:
      //    return { ...state };
      default:
         return state;
   }
};
