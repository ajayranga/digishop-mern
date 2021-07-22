import React, { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';

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
      state.password === state.confirmPassword
         ? dispatch(
              updateUserProfile({
                 id: user._id,
                 name: state.name,
                 email: state.email,
                 password: state.password,
              })
           )
         : dispatchLocal({
              type: 'setMessage',
              payload: 'Passwords must match',
           });
   };
   const userProfile = useSelector((state) => state.userProfile);
   const { user, error } = userProfile;
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;
   const { success } = useSelector((state) => state.userProfileUpdate);
   const initialState = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: null,
   };
   const [state, dispatchLocal] = useReducer(reducer, initialState);
   useEffect(() => {
      if (!userInfo || !userInfo.name) {
         history.push('/login');
      } else if (user.name) {
         dispatchLocal({ type: 'name', payload: user.name });
         dispatchLocal({ type: 'email', payload: user.email });
      } else {
         dispatch(getUserProfile('profile'));
      }
   }, [history, userInfo, dispatch, user]);
   return (
      <Row>
         <Col md={3}>
            <h2>User Profile</h2>
            {error && <Message variant="danger">{error}</Message>}
            {state.message && (
               <Message variant="danger">{state.message}</Message>
            )}
            {success && (
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
         </Col>
      </Row>
   );
};

export default ProfileScreen;
