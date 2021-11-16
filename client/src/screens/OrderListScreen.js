import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { fetchAllOrdersList } from "../actions/orderActions";
import { ORDER_FETCH_ALL_RESET } from "../constants/orderConstants";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const {
    allOrdersList,
    loading: loadingAllOrders,
    error: errorAllOrders,
  } = useSelector((state) => state.allOrdersList);
  const { userInfo, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch({ type: ORDER_FETCH_ALL_RESET });
    if (userInfo.role !== "admin") history.push("/login");
    else dispatch(fetchAllOrdersList());
  }, [history, dispatch, userInfo]);
  return (
    <>
      <Meta title="Orders list" />
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : (
        error && <Message variant="danger">{error}</Message>
      )}
      {loadingAllOrders ? (
        <Loader />
      ) : errorAllOrders ? (
        <Message variant="danger">{errorAllOrders}</Message>
      ) : (
        <Table striped bordered responsive hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL(INR)</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allOrdersList.length !== 0 &&
              allOrdersList.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
