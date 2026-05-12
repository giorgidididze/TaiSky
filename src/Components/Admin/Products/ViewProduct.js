import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { viewProduct } from '../../Admin/Redux/Reducer/productSlice';

export const ViewProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 FROM REDUX STORE
  const product = useSelector(state => state.product.selectedProduct);

  useEffect(() => {
    dispatch(viewProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h3>Loading...</h3>
      </Container>
    );
  }

  const handleDownload = () => {

    if (!product.File) {
      Swal.fire({
        icon: 'error',
        title: 'No file',
        text: 'This product has no downloadable file',
      });
      return;
    }

    const link = document.createElement('a');
    link.href = product.File;
    link.download = product.File || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-5">

      <Row className="justify-content-center">
        <Col md={8}>

          <div className="p-4 bg-white shadow rounded">

            <img
              src={product.ProductImageUrl}
              alt={product.ProductName}
              style={{ width: '100%', borderRadius: '10px' }}
              onError={(e) => e.target.src = '/fallback.png'}
            />

            <h2 className="mt-3">{product.ProductName}</h2>

            <p><b>Category:</b> {product.Category}</p>

            <p><b>Description:</b> {product.Description}</p>

            <p>
              <b>Details:</b> {product.Details}
            </p>

            <h4 className="text-success">
              Price: ₹ {product.Price}
            </h4>

            <div className="d-flex justify-content-between mt-4">

              <Button
                variant="success"
                className="mt-3 ms-2"
                onClick={handleDownload}
              >
                Download File
              </Button>

              <Button
                variant="secondary"
                className="mt-3"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>

            </div>

          </div>

        </Col>
      </Row>

    </Container>
  );
};