import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const MyOrderList = () => {

  // 🔥 ONLY REDUX
  const orders = useSelector(state => state.order.orders);

  return (
    <>
      <Container fluid>

        <Row>
          <Row>
            <Col>
              <h1 className='text-center'>My OrderLists</h1>
            </Col>
          </Row>

          <Row>

            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <Col
                  key={order._id || index}
                  className='m-2 d-flex justify-content-center'
                >

                  <div className='d-flex flex-row order w-75'>

                    <div>
                      <Image
                        src={order.productImage}
                        alt='product image'
                      />
                    </div>

                    <div>
                      <h2>{order.productName}</h2>
                      <p>Delivery Status: {order.status}</p>
                      <p>Ordered Date: {order.createdAt}</p>
                      <p>Delivery Date: {order.deliveryDate}</p>
                    </div>

                  </div>

                </Col>
              ))
            ) : (
              <h5 className='text-center'>No Orders Found</h5>
            )}

          </Row>

        </Row>

      </Container>
    </>
  );
};