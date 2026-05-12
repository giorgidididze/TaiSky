import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { AdminNavbar } from '../Navbar/navbar';

import { useDispatch, useSelector } from 'react-redux';
import { calculateDashboard, setUsername } from '../Redux/Reducer/dashboardSlice';

export const AdminDashboard = () => {

  const dispatch = useDispatch();

  const stats = useSelector(state => state.dashboard.stats);
  const username = useSelector(state => state.dashboard.username);

  // 🔥 REAL DATA FROM STORE
  const products = useSelector(state => state.product.products);
  const orders = useSelector(state => state.order.orders);
  const users = useSelector(state => state.user?.users || []); 

  useEffect(() => {
    dispatch(setUsername("Admin"));

    dispatch(
      calculateDashboard({
        products,
        orders,
        users,
      })
    );

  }, [dispatch, products, orders, users]);

  return (
    <>
      <AdminNavbar />

      <Container fluid className="seller">

        <Row>
          <Col sm={12}>
            <h1 className="text-center">Dashboard</h1>
            <p className="text-center">
              Hello <b>{username}</b>, welcome to Admin Dashboard
            </p>
          </Col>
        </Row>

        <Row>

          <Col sm={3}>
            <Card className="text-center m-2">
              <Card.Body>
                <h5>Products</h5>
                <h2>{stats.totalproduct}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={3}>
            <Card className="text-center m-2">
              <Card.Body>
                <h5>Orders</h5>
                <h2>{stats.totalorder}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={3}>
            <Card className="text-center m-2">
              <Card.Body>
                <h5>Delivered</h5>
                <h2>{stats.orderdeliver}</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={3}>
            <Card className="text-center m-2">
              <Card.Body>
                <h5>Users</h5>
                <h2>{stats.totaluser}</h2>
              </Card.Body>
            </Card>
          </Col>

        </Row>

      </Container>
    </>
  );
};