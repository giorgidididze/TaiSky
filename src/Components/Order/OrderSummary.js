import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../../Admin/Redux/Reducer/orderSlice';
import { API } from '../../Utils/Apiroute';

export const OrderSummary = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  // 🔥 Redux state
  const Order = useSelector(state => state.order.order);

  const ViewAddress = async () => {
    try {
      const response = await axios.post(
        `${API}/api/orders/view-orders/${id}`,
        {},
        {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }
      );

      if (response.data.status) {

        dispatch(setOrder(response.data));

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
        });
      }

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please check it.',
      });
    }
  };

  // 🔥 load on mount
  useEffect(() => {
    ViewAddress();
  }, [id]);

  return (
    <Container fluid>

      {Order && Order.data && (
        <>
          <Row>
            <Col>
              <h1>Order Summary</h1>
            </Col>
          </Row>

          <Row>
            <Row>
              <p>Address</p>

              <Row>
                <Col>
                  <p>{Order.data.address}</p>
                  <p>{Order.data.city}</p>
                  <p>{Order.data.pincode}</p>
                </Col>

                <Col className='d-flex flex-row'>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Col>
              </Row>

            </Row>
          </Row>

          <Row>
            <Row>
              <p>Cart Items</p>

              <Row>
                <Card>
                  <div className='d-flex flex-row'>
                    <Image src={Order.data?.image} />

                    <div>
                      <p>Products Details</p>
                    </div>
                  </div>
                </Card>
              </Row>

            </Row>
          </Row>

          <Row>
            <Button>Pay</Button>
          </Row>

        </>
      )}

    </Container>
  );
};