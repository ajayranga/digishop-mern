import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
const Product = ({ product }) => {
   return (
      <Card className="my-3 p-3 rounded" style={{'height':'477px'}}>
         <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" style={{'height':'280px'}}/>
         </Link>
         <Card.Body>
            <Link to={`/product/${product._id}`}>
               <Card.Title as="div">
                  <strong>{product.name}</strong>
               </Card.Title>
            </Link>
            <Card.Text as="div">
               <div className="my-3">
                  <Rating
                     value={product.rating}
                     numReviews={product.numReviews}
                  ></Rating>
               </div>
            </Card.Text>
            <Card.Text as="h3">INR {product.price}</Card.Text>
         </Card.Body>
      </Card>
   );
};

export default Product;
