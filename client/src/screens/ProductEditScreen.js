import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../actions/productActions';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const ProductEditScreen = ({ match }) => {
   const dispatch = useDispatch();
   const productId = match.params.id;
   const history = useHistory();
   const [name, setName] = useState('');
   const [price, setPrice] = useState(0);
   const [role, setRole] = useState('');
   const submitHandler = (e) => {
      e.preventDefault();
      //   dispatch(updateUserByAdmin({ id: match.params.id, name, email, role }));
   };
   const { users, loading, error } = useSelector((state) => state.usersList);
   const {
      success,
      loading: loadingUpdate,
      error: errorUpdate,
   } = useSelector((state) => state.userUpdate);
   const {
      product,
      loading: loadingProductDetails,
      error: errorProductDetails,
   } = useSelector((state) => state.productDetails);
   useEffect(() => {
      //   if (success) {
      //      dispatch({ type: USER_UPDATE_RESET });
      //      history.push('/admin/userList');
      //   } else {
      //      if (user && user.name) {
      //         setName(user.name);
      //         setEmail(user.email);
      //         setRole(user.role);
      //      } else {
      //         history.push('/admin/userList');
      //      }
      //   }
   }, [history, success, dispatch]);
   return (
      <>
         <Link className="btn btn-light my-3" to={`/admin/userList`}>
            Go back
         </Link>
         <FormContainer>
            <h1>Update Product</h1>
            {loading ? (
               <Loader />
            ) : error ? (
               <Message variant="danger">{error}</Message>
            ) : loadingUpdate ? (
               <Loader />
            ) : (
               <Form onSubmit={submitHandler}>
                  {errorUpdate && (
                     <Message variant="danger">{errorUpdate}</Message>
                  )}
                  {/* <Form.Group controlId="name">
                     <Form.Label>Your Name</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        required
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                     ></Form.Control>
                  </Form.Group>{' '}
                  <Form.Group controlId="email">
                     <Form.Label>Email Address</Form.Label>
                     <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        required
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                     ></Form.Control>
                  </Form.Group>
                  <Form.Group
                     controlId="role"
                     style={{ display: 'flex', flexDirection: 'row' }}
                  >
                     <Form.Label>Role : </Form.Label>
                     <Form.Check
                        type="radio"
                        label="user"
                        checked={role === 'user'}
                        value="user"
                        name="role"
                        className="ml-3"
                        onChange={(e) =>
                           setRole(e.target.checked ? 'user' : 'admin')
                        }
                     ></Form.Check>
                     <Form.Check
                        type="radio"
                        label="admin"
                        value="admin"
                        className="ml-3"
                        checked={role === 'admin'}
                        name="role"
                        onChange={(e) =>
                           setRole(e.target.checked ? 'admin' : 'user')
                        }
                     ></Form.Check>
                  </Form.Group> */}
                  <Button type="submit" variant="light">
                     Update
                  </Button>
               </Form>
            )}
         </FormContainer>
      </>
   );
};

export default ProductEditScreen;
