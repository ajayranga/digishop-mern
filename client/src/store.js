import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
   productListReducer,
   productFetchReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
   userLoginReducer,
   userProfileReducer,
   userRegisterReducer,
   userProfileUpdateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
   productList: productListReducer,
   productDetails: productFetchReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userProfile: userProfileReducer,
   userProfileUpdate: userProfileUpdateReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
   ? JSON.parse(localStorage.getItem('cartItems'))
   : [];
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo'))
   : null;
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
   ? JSON.parse(localStorage.getItem('shippingAddress'))
   : null;
const initialState = {
   cart: {
      cartItems: cartItemsFromLocalStorage,
      shippingAddress: shippingAddressFromLocalStorage,
   },
   userLogin: { userInfo: userInfoFromLocalStorage },
};

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(thunk))
);

export default store;
