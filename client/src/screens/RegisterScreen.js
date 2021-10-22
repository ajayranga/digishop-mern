import React, { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../actions/userActions';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const history = useHistory();
   const redirect = location.search && location.search.split('=')[1];
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
      state.password === state.confirmPassword
         ? dispatch(registerUser(state.name, state.email, state.password))
         : dispatchLocal({
              type: 'setMessage',
              payload: 'Passwords must match',
           });
   };
   const initialState = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: null,
   };
   const [state, dispatchLocal] = useReducer(reducer, initialState);
   const { userInfo, loading, error } = useSelector((state) => state.user);
   useEffect(() => {
      if (userInfo && userInfo.name) history.push(redirect);
      if (state.password === state.confirmPassword)
         dispatchLocal({
            type: 'setMessage',
            payload: null,
         });
   }, [
      userInfo,
      redirect,
      history,
      state.password,
      state.confirmPassword,
      dispatchLocal,
   ]);
   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <FormContainer>
               <h1>Register Here</h1>
               {error && <Message variant="danger">{error}</Message>}
               {state.message && (
                  <Message variant="danger">{state.message}</Message>
               )}
               <Form onSubmit={submitHandler}>
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
                        required
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
                        required
                        onChange={(e) =>
                           dispatchLocal({
                              type: e.target.name,
                              payload: e.target.value,
                           })
                        }
                     ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="light">
                     Register
                  </Button>
               </Form>
               <Row className="py-3">
                  <Col>
                     Already an account?{' '}
                     <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                     >
                        Log In
                     </Link>
                  </Col>
               </Row>{' '}
            </FormContainer>
         )}
      </>
   );
};

export default RegisterScreen;
