import Axios from "axios";
import * as orderConstants from "../constants/orderConstants";

export const crateOrder = (order) => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const headers = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({ type: orderConstants.ORDER_CREATE_REQUEST });
    const { data } = await Axios.post("/api/orders", order, headers);
    dispatch({ type: orderConstants.ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const orderDetails = (orderId) => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const headers = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({ type: orderConstants.ORDER_DETAILS_REQUEST });
    const { data } = await Axios.get("/api/orders/" + orderId, headers);
    dispatch({ type: orderConstants.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      const {
        user: { userInfo },
      } = getState();
      const headers = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      dispatch({ type: orderConstants.ORDER_PAY_REQUEST });
      const { data } = await Axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        headers
      );
      dispatch({ type: orderConstants.ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: orderConstants.ORDER_PAY_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const deliveredOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.ORDER_DELIVERED_REQUEST });
    const {
      user: { userInfo },
    } = getState();
    const headers = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await Axios.put(
      `/api/orders/${order._id}/delivered`,
      {},
      headers
    );
    dispatch({ type: orderConstants.ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DELIVERED_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const myOrdersList = () => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const headers = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({ type: orderConstants.ORDER_MYORDERS_REQUEST });
    const { data } = await Axios.get("/api/orders/myOrders", headers);
    dispatch({ type: orderConstants.ORDER_MYORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_MYORDERS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchAllOrdersList = () => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const headers = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch({ type: orderConstants.ORDER_FETCH_ALL_REQUEST });
    const { data } = await Axios.get("/api/orders/", headers);
    dispatch({ type: orderConstants.ORDER_FETCH_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_FETCH_ALL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
