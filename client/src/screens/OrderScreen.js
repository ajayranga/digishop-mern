import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  orderDetails,
  payOrder,
  deliveredOrder,
} from "../actions/orderActions";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
  ORDER_DETAILS_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [sdkReady, setSDKReady] = useState({ loading: false, loaded: false });
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.user);
  const { success, loading: loadingPay } = useSelector(
    (state) => state.orderPay
  );
  const { success: successDelivered } = useSelector(
    (state) => state.orderDelivered
  );
  const addDecimal = (num) => (Number(num * 100) / 100).toFixed(2);
  if (!loading && !error && order.orderItems) {
    order.orderItemsPrice = addDecimal(
      order.orderItems.reduce(
        (accum, curItem) => accum + curItem.qty * curItem.price,
        0
      )
    );
  }
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(params.id, paymentResult));
  };
  const deliveredHandler = () => {
    dispatch(deliveredOrder(order));
  };
  useEffect(() => {
    const addPaypalScript = async () => {
      if (!sdkReady.loading && !sdkReady.loaded) {
        setSDKReady({ loading: true, loaded: false });
        const { data: clientId } = await axios.get("/api/config/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.addEventListener("load", () => {
          setSDKReady({ loading: false, loaded: true });
        });
        document.body.appendChild(script);
      }
    };
    !window.paypal && addPaypalScript();
    if (!order || success || !order.orderItems || successDelivered) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(orderDetails(params.id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      }
    }
  }, [dispatch, params, order, success, sdkReady, successDelivered]);
  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET });
    if (!userInfo || !userInfo.name) history.push("/login");
  }, [dispatch, history, userInfo]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>{" "}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user && order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user && order.user.email}`}>
                  {order.user && order.user.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress && order.shippingAddress.address},
                {order.shippingAddress && order.shippingAddress.city},
                {order.shippingAddress && order.shippingAddress.postalCode},
                {order.shippingAddress && order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems && order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variat="flush">
                  {order.orderItems &&
                    order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X {addDecimal(item.price)} = INR{" "}
                            {addDecimal(item.qty * item.price)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>INR {order.orderItemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>INR {addDecimal(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>INR {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>INR {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady.loaded ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {userInfo.name &&
                userInfo.role === "admin" &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliveredHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
