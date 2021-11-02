import * as orderConstants from "../constants/orderConstants";

export const orderCreateReducer = (
  state = { order: {}, error: null, loading: false },
  action
) => {
  switch (action.type) {
    case orderConstants.ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case orderConstants.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
        success: true,
      };
    case orderConstants.ORDER_CREATE_FAILED:
      return { ...state, loading: false, error: action.payload };
    case orderConstants.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { order: {}, error: null, loading: false },
  action
) => {
  switch (action.type) {
    case orderConstants.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case orderConstants.ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
      };
    case orderConstants.ORDER_DETAILS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case orderConstants.ORDER_DETAILS_RESET:
      return { order: {}, error: null, loading: false };
    default:
      return state;
  }
};

export const orderPayReducer = (
  state = { error: null, loading: false },
  action
) => {
  switch (action.type) {
    case orderConstants.ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case orderConstants.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case orderConstants.ORDER_PAY_FAILED:
      return { ...state, loading: false, error: action.payload };
    case orderConstants.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const myOrdersReducer = (
  state = { orders: [], error: null, loading: false },
  action
) => {
  switch (action.type) {
    case orderConstants.ORDER_MYORDERS_REQUEST:
      return { ...state, loading: true };
    case orderConstants.ORDER_MYORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: action.payload,
      };
    case orderConstants.ORDER_MYORDERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case orderConstants.ORDER_MYORDERS_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const allOrdersListReducer = (
  state = { allOrdersList: [], error: null, loading: false },
  action
) => {
  switch (action.type) {
    case orderConstants.ORDER_FETCH_ALL_REQUEST:
      return { ...state, loading: true };
    case orderConstants.ORDER_FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        allOrdersList: action.payload,
      };
    case orderConstants.ORDER_FETCH_ALL_FAILED:
      return { ...state, loading: false, error: action.payload };
    case orderConstants.ORDER_FETCH_ALL_RESET:
      return { allOrdersList: [] };
    default:
      return state;
  }
};

export const orderDeliveredReducer = (
  state = { error: null, loading: false },
  action
) => {
  switch (action.type) {
    case orderConstants.ORDER_DELIVERED_REQUEST:
      return { ...state, loading: true };
    case orderConstants.ORDER_DELIVERED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case orderConstants.ORDER_DELIVERED_FAILED:
      return { ...state, loading: false, error: action.payload };
    case orderConstants.ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};
