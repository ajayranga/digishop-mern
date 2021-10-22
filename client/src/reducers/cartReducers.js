import * as cartConstants from '../constants/cartConstants';
const initialState = {
   cartItems: [],
   shippingAddress: {},
   paymentMethod: '',
};
export const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case cartConstants.CART_ADD_ITEM:
         const itemExist = state.cartItems.find(
            (item) => item.product === action.payload.product
         );
         if (itemExist) {
            return {
               ...state,
               cartItems: state.cartItems.map((item) =>
                  item.product === action.payload.product
                     ? action.payload
                     : item
               ),
            };
         } else {
            return {
               ...state,
               cartItems: [...state.cartItems, action.payload],
            };
         }
      case cartConstants.CART_REMOVE_ITEM:
         return {
            ...state,
            cartItems: state.cartItems.filter(
               (item) => item.product !== action.payload.product
            ),
         };
      case cartConstants.CART_SAVE_SHIPPING_ADDRESS:
         return {
            ...state,
            shippingAddress: action.payload,
         };
      case cartConstants.CART_SAVE_PAYMENT_METHOD:
         return {
            ...state,
            paymentMethod: action.payload,
         };
      default:
         return state;
   }
};
