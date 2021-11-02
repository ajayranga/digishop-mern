import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, updateProduct } from "../actions/productActions";
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_FETCH_RESET,
} from "../constants/productConstants";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import axios from "axios";

const ProductEditScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const history = useHistory();
  const {
    product,
    loading: loadingProductDetails,
    error: errorProductDetails,
    success: successProductDetails,
  } = useSelector((state) => state.productDetails);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  // const [user, setUser] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        countInStock,
        image,
        brand,
        category,
        description,
      })
    );
  };
  const uploadFileHnadler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const {
    success: successProductUpdate,
    loading: loadingProductUpdate,
    error: errorProductUpdate,
  } = useSelector((state) => state.productUpdate);
  useEffect(() => {
    if (Object.keys(product).length === 0) {
      dispatch(fetchProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
    }
    if (successProductUpdate) {
      dispatch({ type: PRODUCT_FETCH_RESET });
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productList");
    }
  }, [
    productId,
    successProductDetails,
    dispatch,
    successProductUpdate,
    history,
  ]);
  return (
    <>
      <Link className="btn btn-light my-3" to={`/admin/productList`}>
        Go back
      </Link>
      <FormContainer>
        <h1>Update Product</h1>
        {loadingProductDetails ? (
          <Loader />
        ) : errorProductDetails ? (
          <Message variant="danger">{errorProductDetails}</Message>
        ) : loadingProductUpdate ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            {errorProductUpdate && (
              <Message variant="danger">{errorProductUpdate}</Message>
            )}
            <Form.Group controlId="name">
              <Form.Label>Product Name : </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name..."
                value={name}
                required
                name="name"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Product category : </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category..."
                value={category}
                required
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Product Image : </Form.Label>
              <Form.Control
                type="text"
                value={image}
                placeholder="Enter image url..."
                required
                name="image"
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              {uploading ? (
                <Loader />
              ) : (
                <Form.File
                  className="mt-2"
                  id="image-file"
                  label="Choose File"
                  custom
                  accept=".jpg,.png,.jpeg"
                  onChange={uploadFileHnadler}
                ></Form.File>
              )}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Product Brand : </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand Name..."
                value={brand}
                required
                name="brand"
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Product Description : </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description..."
                value={description}
                required
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Product Price : </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price..."
                value={price}
                required
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Product Count In Stock : </Form.Label>
              <Form.Control
                type="number"
                placeholder="Count In Stock ..."
                value={countInStock}
                required
                name="countInStock"
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
