import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../Admin/Redux/Reducer/cartSlice';

export const Cart = () => {

  const dispatch = useDispatch();

  // 🔥 FROM REDUX
  const mycart = useSelector(state => state.cart.items || []);

  const [productQuantities, setProductQuantities] = useState({});

  const DeleteCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotalPrice = () => {
    return mycart.reduce((total, product) => {

      const itemPrice = product.Price;

      const itemQuantity =
        productQuantities[product.id] || 1;

      return total + itemPrice * itemQuantity;

    }, 0);
  };

  return (
    <Container fluid>

      <Row>
        <Col>
          <h1 className='text-center mt-3'>My Cart</h1>
        </Col>
      </Row>

      {Array.isArray(mycart) && mycart.length > 0 ? (
        mycart.map((product, index) => (
          <div key={index}>
            <Row className='mt-4 border-bottom pb-4'>

              <Col lg={4} md={12} className='text-center'>
                <Image
                  src={product.ProductImageUrl}
                  alt={product.ProductName}
                  fluid
                  rounded
                  style={{ maxHeight: '250px', objectFit: 'cover' }}
                />
              </Col>

              <Col lg={8} md={12}>

                <Row>
                  <Col>
                    <div className='d-flex flex-row m-2'>
                      <h5>Product Name:&nbsp;</h5>
                      <p>{product.ProductName}</p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className='d-flex flex-row m-2'>
                      <h5>Category:&nbsp;</h5>
                      <p>{product.Category}</p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className='d-flex flex-row m-2'>
                      <h5>Description:&nbsp;</h5>
                      <p>{product.Description}</p>
                    </div>
                  </Col>
                </Row>

                <Row className='mt-2'>

                  <Col md={6}>
                    <div className='d-flex flex-row align-items-center'>
                      <h5>Quantity:&nbsp;</h5>

                      <select
                        value={
                          productQuantities[product.id] || 1
                        }
                        onChange={(e) => {
                          setProductQuantities(prev => ({
                            ...prev,
                            [product.id]: Number(e.target.value)
                          }));
                        }}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1)
                          .map(q => (
                            <option key={q} value={q}>{q}</option>
                          ))}
                      </select>

                    </div>
                  </Col>

                  <Col md={6}>
                    <div className='d-flex flex-row align-items-center'>
                      <h5>Price:&nbsp;</h5>

                      <FontAwesomeIcon icon={faIndianRupee} className='me-1' />

                      <p>
                        {product.Price *
                          (productQuantities[product.id] || 1)}
                      </p>

                    </div>
                  </Col>

                </Row>

                <Row className='mt-3'>
                  <Col>
                    <Button
                      variant='danger'
                      onClick={() => DeleteCart(product._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      &nbsp; Remove
                    </Button>
                  </Col>
                </Row>

              </Col>
            </Row>
          </div>
        ))
      ) : (
        <h1 className='text-center mt-5'>No items in the cart.</h1>
      )}

      {mycart.length > 0 && (
        <Row className='mt-5'>
          <Col lg={6} className='m-auto'>
            <div className='p-4 shadow rounded' style={{ background: '#f8f9fa' }}>

              <h4 className='mb-4'>Price Details</h4>

              <Row>
                <Col><p>Price :</p></Col>
                <Col>
                  <p style={{ float: 'right' }}>
                    <FontAwesomeIcon icon={faIndianRupee} />
                    {calculateTotalPrice()}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col><p>Delivery Charges :</p></Col>
                <Col>
                  <p style={{ float: 'right' }} className='text-success'>
                    Free
                  </p>
                </Col>
              </Row>

              <hr />

              <Row>
                <Col><h5>Total Price :</h5></Col>
                <Col>
                  <h5 style={{ float: 'right' }}>
                    <FontAwesomeIcon icon={faIndianRupee} />
                    {calculateTotalPrice()}
                  </h5>
                </Col>
              </Row>

              <Row className='mt-4'>
                <Col>
                  <Link to={'/'}>
                    <Button variant='primary'>Back</Button>
                  </Link>

                  <Link to={'/address'}>
                    <Button variant='warning' style={{ float: 'right' }}>
                      Place Order
                    </Button>
                  </Link>
                </Col>
              </Row>

            </div>
          </Col>
        </Row>
      )}

    </Container>
  );
};