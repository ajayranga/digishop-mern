import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
   Row,
   Col,
   Image,
   ListGroup,
   Card,
   Button,
   Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductScreen = () => {
   const dispatch = useDispatch();
   const [qty, setQty] = useState(1);
   const { id } = useParams();
   const history = useHistory();
   const { product, error, loading } = useSelector(
      (state) => state.productDetails
   );
   useEffect(() => {
      dispatch(fetchProduct(id));
   }, [dispatch, id]);
   const addToCartHandler = () => history.push(`/cart/${id}?qty=${qty}`);
   return (
      <>
         {loading ? (
            <Loader></Loader>
         ) : error ? (
            <Message variant="danger">{error}</Message>
         ) : (
            <>
               <Link className="btn btn-light my-3" to="/">
                  Go Back
               </Link>
               <Row>
                  <Col md={6}>
                     <Image src={product.image} alt={product.name} fluid />
                  </Col>
                  <Col md={3}>
                     <ListGroup variant="flush">
                        <ListGroup.Item>
                           <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Rating
                              value={product.rating}
                              numReviews={product.numReviews}
                           />
                        </ListGroup.Item>
                        <ListGroup.Item>
                           Price: INR {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                           Description: {product.description}
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
                  <Col md={3}>
                     <Card>
                        <ListGroup variant="flush">
                           <ListGroup.Item>
                              <Row>
                                 <Col>Price:</Col>
                                 <Col>
                                    <strong>INR {product.price}</strong>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Status:</Col>
                                 <Col>
                                    {product.countInStock > 0
                                       ? 'Available'
                                       : 'Out Of Stock'}
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           {product.countInStock > 0 && (
                              <ListGroup.Item>
                                 <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                       <Form.Control
                                          as="select"
                                          value={qty}
                                          onChange={(e) =>
                                             setQty(e.target.value)
                                          }
                                       >
                                          {[
                                             ...Array(
                                                product.countInStock
                                             ).keys(),
                                          ].map((x) => (
                                             <option value={x + 1} key={x + 1}>
                                                {x + 1}
                                             </option>
                                          ))}
                                       </Form.Control>
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           )}
                           <ListGroup.Item>
                              <Button
                                 className="btn-block"
                                 type="button"
                                 onClick={addToCartHandler}
                                 disabled={
                                    product.countInStock > 0 ? false : true
                                 }
                              >
                                 Add to Cart
                              </Button>
                           </ListGroup.Item>
                        </ListGroup>
                     </Card>
                  </Col>
               </Row>
            </>
         )}
      </>
   );
};

export default ProductScreen;
