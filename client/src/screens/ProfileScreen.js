import React, { useReducer, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { myOrdersList } from '../actions/orderActions';

const ProfileScreen = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const reducer = (state, action) => {
      switch (action.type) {
         case 'name':
            return { ...state, name: action.payload };
         case 'email':
            return { ...state, email: action.payload };
         case 'password':
            return { ...state, password: action.payload };
         case 'confirmPassword':
            return { ...state, confirmPassword: action.payload };
         case 'setMessage':
            return { ...state, message: action.payload };
         default:
            return state;
      }
   };
   const submitHandler = (e) => {
      e.preventDefault();
      if (state.password === state.confirmPassword) {
         dispatch(
            updateUserProfile({
               id: userInfo._id,
               name: state.name,
               email: state.email,
               password: state.password,
            })
         );
         setUpdated(true);
      } else
         dispatchLocal({
            type: 'setMessage',
            payload: 'Passwords must match',
         });
   };
   const { userInfo, error } = useSelector((state) => state.user);
   const {
      orders,
      loading: loadingOrders,
      error: errorOrders,
   } = useSelector((state) => state.myOrders);
   const initialState = {
      name: userInfo && userInfo.name ? userInfo.name : '',
      email: userInfo && userInfo.name ? userInfo.email : '',
      password: '',
      confirmPassword: '',
      message: null,
   };
   const [state, dispatchLocal] = useReducer(reducer, initialState);
   const [updated, setUpdated] = useState(false);
   useEffect(() => {
      if (!userInfo || !userInfo.name) {
         history.push('/login');
      }
   }, [history, userInfo, dispatch]);
   useEffect(() => {
      dispatch(myOrdersList());
   }, [dispatch]);
   return (
      <Row>
         <Col md={3}>
            <h2>User Profile</h2>
            {error && <Message variant="danger">{error}</Message>}
            {state.message && (
               <Message variant="danger">{state.message}</Message>
            )}
            {updated && (
               <Message variant="success">
                  Profile updated successufully
               </Message>
            )}
            <Form onSubmit={submitHandler} autoComplete={'false'}>
               <Form.Group controlId="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter your name"
                     value={state.name}
                     required
                     name="name"
                     onChange={(e) =>
                        dispatchLocal({
                           type: e.target.name,
                           payload: e.target.value,
                        })
                     }
                  ></Form.Control>
               </Form.Group>{' '}
               <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                     type="email"
                     placeholder="Enter your email"
                     value={state.email}
                     required
                     name="email"
                     onChange={(e) =>
                        dispatchLocal({
                           type: e.target.name,
                           payload: e.target.value,
                        })
                     }
                  ></Form.Control>
               </Form.Group>{' '}
               <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="password"
                     value={state.password}
                     name="password"
                     minLength={8}
                     onChange={(e) =>
                        dispatchLocal({
                           type: e.target.name,
                           payload: e.target.value,
                        })
                     }
                  ></Form.Control>
               </Form.Group>
               <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="confirm password"
                     value={state.confirmPassword}
                     name="confirmPassword"
                     minLength={8}
                     onChange={(e) =>
                        dispatchLocal({
                           type: e.target.name,
                           payload: e.target.value,
                        })
                     }
                  ></Form.Control>
               </Form.Group>
               <Button type="submit" variant="light">
                  Update
               </Button>
            </Form>
         </Col>
         <Col md={9}>
            <h2>My orders</h2>
            {loadingOrders ? (
               <Loader />
            ) : errorOrders ? (
               <Message varaint="danger">{errorOrders}</Message>
            ) : (
               <Table striped bordered hover responsive className="table-sm">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders.length !== 0 &&
                        orders.map((order) => (
                           <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>
                                 {new Date(order.createdAt).toDateString()}
                              </td>
                              <td>{order.totalPrice}</td>
                              <td>
                                 {order.isPaid ? (
                                    new Date(order.paidAt).toDateString()
                                 ) : (
                                    <i
                                       className="fas fa-times"
                                       style={{ color: 'red' }}
                                    ></i>
                                 )}
                              </td>
                              <td>
                                 {' '}
                                 {order.isDelivered ? (
                                    new Date(order.deliveredAt).toDateString()
                                 ) : (
                                    <i
                                       className="fas fa-times"
                                       style={{ color: 'red' }}
                                    ></i>
                                 )}
                              </td>
                              <td>
                                 <LinkContainer to={`/orders/${order._id}`}>
                                    <Button className="btn-sm" variant="light">
                                       Details
                                    </Button>
                                 </LinkContainer>{' '}
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </Table>
            )}
         </Col>
      </Row>
   );
};

export default ProfileScreen;
