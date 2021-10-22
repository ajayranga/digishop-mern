import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { crateOrder } from '../actions/orderActions';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = ({ history }) => {
   const dispatch = useDispatch();
   const cart = useSelector((state) => state.cart);

   const addDecimal = (num) => (Number(num * 100) / 100).toFixed(2);
   cart.cartPrice = addDecimal(
      cart.cartItems.reduce(
         (accum, curItem) => accum + curItem.qty * curItem.price,
         0
      )
   );
   cart.shippingPrice = addDecimal(cart.cartPrice > 500 ? 0 : 75);
   cart.taxPrice = addDecimal(Number((cart.cartPrice / 10).toFixed(2)));
   cart.totalPrice = (
      Number(cart.cartPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
   ).toFixed(2);

   const { order, success, error } = useSelector((state) => state.orderCreate);

   const placeOrderHandler = (e) => {
      e.preventDefault();
      dispatch(
         crateOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.cartPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
         })
      );
   };
   useEffect(() => {
      if (success) {
         history.push(`/order/${order._id}`);
      }
   }, [success, order, history]);
   return (
      <>
         <CheckoutSteps step1 step2 step3 />
         <Row>
            <Col md={8}>
               <ListGroup variant="flush">
                  <ListGroup.Item>
                     <h2>Shipping</h2>
                     <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address},
                        {cart.shippingAddress.city},
                        {cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}
                     </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2>Payment Method</h2>
                     <p>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                     </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2>Order Items</h2>
                     {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                     ) : (
                        <ListGroup variat="flush">
                           {cart.cartItems.map((item, index) => (
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
                                       {item.qty} X {addDecimal(item.price)} =
                                       INR {addDecimal(item.qty * item.price)}
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
                           <Col>INR {cart.cartPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Shipping</Col>
                           <Col>INR {cart.shippingPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Tax</Col>
                           <Col>INR {cart.taxPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total</Col>
                           <Col>INR {cart.totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        {error && <Message variant="danger">{error}</Message>}
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button
                           type="button"
                           className="btn-block"
                           disabled={cart.cartItems.length === 0}
                           onClick={placeOrderHandler}
                        >
                           Place Order
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default PlaceOrderScreen;
