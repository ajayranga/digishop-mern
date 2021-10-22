import * as userConstants from '../constants/userConstants';
const initailState = { userInfo: {}, loading: false, error: null };

export const userReducer = (state = initailState, action) => {
   switch (action.type) {
      case userConstants.USER_LOGIN_REQUEST:
         return { ...state, userInfo: {}, error: null, loading: true };
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
         return { ...state, userInfo: {}, loading: false, error: null };
      case userConstants.USER_REGISTER_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_REGISTER_SUCCESS:
         return { ...state, userInfo: action.payload, loading: false };
      case userConstants.USER_REGISTER_FAILED:
         return {
            ...state,
            userInfo: {},
            error: action.payload,
            loading: false,
         };
      case userConstants.USER_PROFILE_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_PROFILE_SUCCESS:
         return {
            ...state,
            userInfo: {
               ...state.userInfo,
               name: action.payload.name,
               email: action.payload.email,
               role: action.payload.role,
            },
            loading: false,
         };
      case userConstants.USER_PROFILE_FAILED:
         return { ...state, error: action.payload, loading: false };
      case userConstants.USER_PROFILE_UPDATE_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_PROFILE_UPDATE_SUCCESS:
         return {
            ...state,
            userInfo: action.payload,
            loading: false,
         };
      case userConstants.USER_PROFILE_UPDATE_FAILED:
         return { ...state, error: action.payload, loading: false };
      default:
         return state;
   }
};

export const usersListReducer = (
   state = { users: [], error: null, loading: false },
   action
) => {
   switch (action.type) {
      case userConstants.USER_LIST_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_LIST_SUCCESS:
         return { ...state, loading: false, users: action.payload };
      case userConstants.USER_LIST_FAILED:
         return {
            ...state,
            loading: false,
            users: [],
            error: action.payload,
         };
      case userConstants.USER_LIST_RESET:
         return { ...state, users: [] };
      default:
         return state;
   }
};
export const userDeleteReducer = (
   state = { success: false, error: null, loading: false },
   action
) => {
   switch (action.type) {
      case userConstants.USER_DELETE_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_DELETE_SUCCESS:
         return { ...state, loading: false, success: true };
      case userConstants.USER_DELETE_FAILED:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};
export const userUpdateReducer = (
   state = { success: false, error: null, loading: false },
   action
) => {
   switch (action.type) {
      case userConstants.USER_UPDATE_REQUEST:
         return { ...state, loading: true };
      case userConstants.USER_UPDATE_SUCCESS:
         return { ...state, loading: false, success: true };
      case userConstants.USER_UPDATE_FAILED:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      case userConstants.USER_UPDATE_RESET:
         return {};
      default:
         return state;
   }
};

// export const userLoginReducer = (
//    state = {
//       userInfo: localStorage.getItem('userInfo')
//          ? JSON.parse(localStorage.getItem('userInfo'))
//          : {},
//       loading: false,
//       error: null,
//    },
//    action
// ) => {
//    switch (action.type) {
//       case userConstants.USER_LOGIN_REQUEST:
//          return { ...state, userInfo: {}, loading: true };
//       case userConstants.USER_LOGIN_SUCCESS:
//          return { ...state, userInfo: action.payload, loading: false };
//       case userConstants.USER_LOGIN_FAILED:
//          return {
//             ...state,
//             userInfo: {},
//             error: action.payload,
//             loading: false,
//          };
//       case userConstants.USER_LOGOUT:
//          return { ...state, userInfo: {}, error: null, loading: false };
//       default:
//          return state;
//    }
// };

// export const userRegisterReducer = (
//    state = {
//       userInfo: localStorage.getItem('userInfo')
//          ? JSON.parse(localStorage.getItem('userInfo'))
//          : {},
//       loading: false,
//       error: null,
//    },
//    action
// ) => {
//    switch (action.type) {
//       case userConstants.USER_REGISTER_REQUEST:
//          return { ...state, loading: true };
//       case userConstants.USER_REGISTER_SUCCESS:
//          return { ...state, userInfo: action.payload, loading: false };
//       case userConstants.USER_REGISTER_FAILED:
//          return { ...state, error: action.payload, loading: false };
//       default:
//          return state;
//    }
// };

// export const userProfileReducer = (
//    state = { user: {}, loading: false, error: null },
//    action
// ) => {
//    switch (action.type) {
//       case userConstants.USER_PROFILE_REQUEST:
//          return { ...state, loading: true };
//       case userConstants.USER_PROFILE_SUCCESS:
//          return { ...state, user: action.payload, loading: false };
//       case userConstants.USER_PROFILE_FAILED:
//          return { ...state, error: action.payload, loading: false };
//       default:
//          return state;
//    }
// };

// export const userProfileUpdateReducer = (
//    state = { userInfo: {}, loading: false, error: null, success: false },
//    action
// ) => {
//    switch (action.type) {
//       case userConstants.USER_PROFILE_UPDATE_REQUEST:
//          return { ...state, loading: true };
//       case userConstants.USER_PROFILE_UPDATE_SUCCESS:
//          return {
//             ...state,
//             success: true,
//             userInfo: action.payload,
//             loading: false,
//          };
//       case userConstants.USER_PROFILE_UPDATE_FAILED:
//          return { ...state, error: action.payload, loading: false };
//       // case userConstants.USER_PROFILE_UPDATE_RESET:
//       //    return { ...state };
//       default:
//          return state;
//    }
// };
