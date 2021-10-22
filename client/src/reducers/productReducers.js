import * as productConstants from '../constants/productConstants';
export const productListReducer = (
   state = { products: [], loading: false, error: null },
   action
) => {
   switch (action.type) {
      case productConstants.PRODUCT_LIST_REQUEST:
         return { ...state, products: [], loading: true };
      case productConstants.PRODUCT_LIST_SUCCESS:
         return { ...state, products: action.payload, loading: false };
      case productConstants.PRODUCT_LIST_FAIL:
         return {
            ...state,
            loading: false,
            products: [],
            error: action.payload,
         };
      default:
         return { ...state };
   }
};
export const productFetchReducer = (
   state = { product: {}, loading: false, error: null },
   action
) => {
   switch (action.type) {
      case productConstants.PRODUCT_FETCH_REQUEST:
         return { ...state, product: {}, loading: true };
      case productConstants.PRODUCT_FETCH_SUCCESS:
         return { ...state, product: action.payload, loading: false };
      case productConstants.PRODUCT_FETCH_FAIL:
         return {
            ...state,
            loading: false,
            product: {},
            error: action.payload,
         };
      default:
         return { ...state };
   }
};

export const productDeleteReducer = (
   state = { loading: false, error: null },
   action
) => {
   switch (action.type) {
      case productConstants.PRODUCT_DELETE_REQUEST:
         return { ...state, loading: true };
      case productConstants.PRODUCT_DELETE_SUCCESS:
         return { success: true, loading: false };
      case productConstants.PRODUCT_DELETE_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      default:
         return { ...state };
   }
};

export const productCreateReducer = (
   state = { loading: false, error: null },
   action
) => {
   switch (action.type) {
      case productConstants.PRODUCT_CREATE_REQUEST:
         return { ...state, loading: true };
      case productConstants.PRODUCT_CREATE_SUCCESS:
         return {
            success: true,
            loading: false,
            createdProduct: action.payload,
         };
      case productConstants.PRODUCT_CREATE_FAIL:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      case productConstants.PRODUCT_CREATE_RESET:
         return { loading: false, error: null };
      default:
         return { ...state };
   }
};
