import React, { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const history = useHistory();
   const redirect = location.search && location.search.split('=')[1];
   const reducer = (state, action) => {
      switch (action.type) {
         case 'email':
            return { ...state, email: action.payload };
         case 'password':
            return { ...state, password: action.payload };
         default:
            return state;
      }
   };
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(loginUser(state.email, state.password));
   };
   const initialState = { email: '', password: '' };
   const [state, dispatchLocal] = useReducer(reducer, initialState);
   const { userInfo, loading, error } = useSelector((state) => state.user);
   useEffect(() => {
      if (userInfo && userInfo.name) history.push(redirect);
   }, [userInfo, redirect, history]);
   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <FormContainer>
               <h1>Sign In</h1>
               {error && <Message variant="danger">{error}</Message>}
               <Form onSubmit={submitHandler}>
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
                        required
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
                     Log In
                  </Button>
               </Form>
               <Row className="py-3">
                  <Col>
                     New User?{' '}
                     <Link
                        to={
                           redirect
                              ? `/register?redirect=${redirect}`
                              : '/register'
                        }
                     >
                        Sign Up here
                     </Link>
                  </Col>
               </Row>{' '}
            </FormContainer>
         )}
      </>
   );
};

export default LoginScreen;
