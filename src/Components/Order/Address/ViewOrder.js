import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ViewOrder = () => {

  const navigate = useNavigate();

  // 🔥 from Redux store
  const order = useSelector(state => state.order.order);

  return (
    <Container fluid>

      <Row>
        <Col>
          <h1 className='text-center'>View Order</h1>
        </Col>
      </Row>

      <Row>
        <Col>

          {order ? (
            <div>

              <Row className='justify-content-center'>
                <Col className='text-center'>
                  <Image
                    alt="Product"
                    src={order.productImage || "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg"}
                    height={400}
                    rounded
                  />
                </Col>
              </Row>

              <Table responsive striped bordered hover className='text-center mt-4 '>
                <thead>

                  <tr>
                    <th>Product Name</th>
                    <td>{order.productName}</td>
                  </tr>

                  <tr>
                    <th>Quantity</th>
                    <td>{order.quantity}</td>
                  </tr>

                  <tr>
                    <th>Address</th>
                    <td>{order.address}</td>
                  </tr>

                  <tr>
                    <th>Order ID</th>
                    <td>{order.orderId}</td>
                  </tr>

                  <tr>
                    <th>Order Amount</th>
                    <td>{order.amount}</td>
                  </tr>

                  <tr>
                    <th>Transaction ID</th>
                    <td>{order.transactionId}</td>
                  </tr>

                  <tr>
                    <th>Date</th>
                    <td>{order.date}</td>
                  </tr>

                </thead>
              </Table>

            </div>
          ) : (
            <h5 className="text-center mt-5 text-muted">
              No order selected
            </h5>
          )}

        </Col>
      </Row>

      <Row className='justify-content-center mt-3'>
        <Col xs='auto'>
          <Button variant='primary' onClick={() => navigate('/')}>
            Home
          </Button>
        </Col>

        <Col xs='auto'>
          <Button variant='danger' onClick={() => navigate(-1)}>
            Close
          </Button>
        </Col>
      </Row>

    </Container>
  );
};