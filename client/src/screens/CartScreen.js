import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import {
   Row,
   Col,
   Card,
   Button,
   Image,
   ListGroup,
   Form,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
   const params = useParams();
   const history = useHistory();
   const location = useLocation();
   const productId = params.id;
   const qty = location.search ? Number(location.search.split('=')[1]) : 1;
   const dispatch = useDispatch();
   const { cartItems } = useSelector((state) => state.cart);
   var totalQty = 0,
      totalPrice = 0;
   cartItems.forEach((item) => {
      totalQty += Number(item.qty);
      totalPrice += item.price * item.qty;
   });
   useEffect(() => {
      if (productId) {
         dispatch(addToCart(productId, qty));
      }
   }, [dispatch, productId, qty]);
   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
   };
   const checkoutHandler = () => {
      history.push('/login?redirect=shipping');
   };
   return (
      <Row>
         <Col md={8}>
            <h1>Shpooing Cart</h1>
            {cartItems.length === 0 ? (
               <Message>
                  Your cart is empty <Link to="/">Go back</Link>
               </Message>
            ) : (
               <ListGroup variant="flush">
                  {cartItems.map((item) => (
                     <ListGroup.Item key={item.product}>
                        <Row>
                           <Col md={2}>
                              <Image
                                 src={item.image}
                                 alt={item.name}
                                 fluid
                                 rounded
                              ></Image>
                           </Col>
                           <Col md={3}>
                              <Link to={`/product/${item.product}`}>
                                 {item.name}
                              </Link>
                           </Col>
                           <Col md={2}>INR {item.price}</Col>
                           <Col md={2}>
                              {item.countInStock > 0 && (
                                 <Form.Control
                                    as="select"
                                    value={item.qty}
                                    onChange={(e) =>
                                       dispatch(
                                          addToCart(
                                             item.product,
                                             Number(e.target.value)
                                          )
                                       )
                                    }
                                 >
                                    {[...Array(item.countInStock).keys()].map(
                                       (x) => (
                                          <option value={x + 1} key={x + 1}>
                                             {x + 1}
                                          </option>
                                       )
                                    )}
                                 </Form.Control>
                              )}
                           </Col>
                           <Col md={2}>
                              <Button
                                 type="button"
                                 variant="light"
                                 onClick={() =>
                                    removeFromCartHandler(item.product)
                                 }
                              >
                                 <i className="fas fa-trash"></i>
                              </Button>
                           </Col>
                        </Row>
                     </ListGroup.Item>
                  ))}
               </ListGroup>
            )}
         </Col>{' '}
         <Col md={4}>
            <Card>
               <ListGroup>
                  <ListGroup.Item>
                     <h2>Subtotal ({totalQty}) items</h2>
                     INR {totalPrice.toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Button
                        type="button"
                        className="btn-block"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                     >
                        Go to Checkout
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
            </Card>
         </Col>
      </Row>
   );
};

export default CartScreen;
