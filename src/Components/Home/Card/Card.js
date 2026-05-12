import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Admin/Redux/Reducer/cartSlice';

export const Cards = ({ values }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 CART FROM STORE
  const cart = useSelector(state => state.cart?.items || []);

  const addtocart = () => {

    const exists = cart.find(
      item => item._id === values._id || item.id === values._id
    );

    if (exists) {
      Swal.fire({
        icon: 'info',
        title: 'Already in cart',
        text: 'This product is already in your cart',
      });
      return;
    }

    const product = {
      _id: values._id,
      ProductName: values.ProductName,
      Price: values.Price,
      ProductImageUrl: values.ProductImageUrl,
      Category: values.Category,
      Description: values.Description
    };

    dispatch(addToCart(product));

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: 'Product added to cart',
    });
  };

  const goToDetails = () => {
    navigate(`/view-product/${values._id}`);
  };

  return (
    <Card className='custom-card mt-4 m-auto'>
      <Card.Img
        variant="top"
        src={values.ProductImageUrl}
        alt="Product"
        className="card-img"
        onClick={goToDetails}
        style={{ cursor: "pointer" }}
      />

      <Card.Body>
        <Card.Title>{values.ProductName}</Card.Title>

        <hr className="divider" />

        <Card.Text>
          <b>Category:</b> {values.Category}
        </Card.Text>

        <Card.Text>
          <b>Description:</b> {values.Description}
        </Card.Text>

        <Card.Text>
          <b>Price:</b> ₹ {values.Price}
        </Card.Text>

        <div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>

          <Button variant="success" onClick={addtocart}>
            Add to Cart
          </Button>

          <Button variant="info" onClick={goToDetails}>
            Details
          </Button>

        </div>

      </Card.Body>
    </Card>
  );
};