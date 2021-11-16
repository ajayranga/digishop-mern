import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_LIST_RESET,
} from "../constants/productConstants";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const {
    products,
    totalPages,
    pageNumber: pageNumberStore,
    loading: loadingProducts,
    error: errorProducts,
  } = useSelector((state) => state.productList);
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const {
    success: successCreate,
    createdProduct,
    loading: loadingProductCreate,
    error: errorProductCreate,
  } = useSelector((state) => state.productCreate);
  const {
    success,
    loading: loadingProductDelete,
    error: errorProductDelete,
  } = useSelector((state) => state.productDelete);

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  const deleteProductHandler = (id) => {
    window.confirm("Are you sure ?");
    dispatch(deleteProduct(id));
  };
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo.role !== "admin") history.push("/login");
    if (successCreate)
      history.push(`/admin/product/${createdProduct._id}/edit`);
    else dispatch(listProducts("", pageNumber));
  }, [
    history,
    dispatch,
    userInfo,
    success,
    pageNumber,
    createdProduct,
    successCreate,
  ]);
  useEffect(() => {
    dispatch({ type: PRODUCT_LIST_RESET });
  }, [dispatch]);
  return (
    <>
      <Meta title="Products list" />
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => createProductHandler()}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : (
        error && <Message variant="danger">{error}</Message>
      )}
      {loadingProductDelete ? (
        <Loader />
      ) : (
        errorProductDelete && (
          <Message variant="danger">{errorProductDelete}</Message>
        )
      )}
      {loadingProductCreate ? (
        <Loader />
      ) : (
        errorProductCreate && (
          <Message variant="danger">{errorProductCreate}</Message>
        )
      )}
      {loadingProducts ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered responsive hover className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.length !== 0 &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>INR {product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate
            pageNumber={pageNumberStore}
            totalPages={totalPages}
            isAdmin={true}
          />{" "}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
