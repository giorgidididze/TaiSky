import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { clearAddress } from '../Admin/Redux/Reducer/orderSlice';

export const ViewAddress = () => {

  const dispatch = useDispatch();

  // 🔥 address from store
  const address = useSelector(state => state.order.address);

  const handleDelete = () => {
    dispatch(clearAddress());

    Swal.fire({
      icon: 'success',
      title: 'Deleted',
      text: 'Address removed successfully',
    });
  };

  return (
    <Container fluid className="mt-4">

      <Row>
        <Col className="text-center">
          <h2>View Address</h2>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">

        <Col md={6}>

          {address ? (
            <Card className="p-3 shadow">

              <h5><b>Address:</b> {address.address}</h5>
              <h5><b>City:</b> {address.city}</h5>
              <h5><b>State:</b> {address.state}</h5>
              <h5><b>Country:</b> {address.country}</h5>
              <h5><b>Phone:</b> {address.phone}</h5>
              <h5><b>Pincode:</b> {address.pincode}</h5>

              <Button
                variant="danger"
                className="mt-3"
                onClick={handleDelete}
              >
                Delete Address
              </Button>

            </Card>
          ) : (
            <h5 className="text-center text-muted">
              No address found
            </h5>
          )}

        </Col>

      </Row>

    </Container>
  );
};