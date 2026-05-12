import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { AdminNavbar } from '../Navbar/navbar';
import Pagination from 'react-bootstrap/Pagination';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { allProduct, deleteProduct } from '../Redux/Reducer/productSlice';

export const AdminProductList = () => {

  const dispatch = useDispatch();

  // 🔥 FROM REDUX STORE
  const AllProducts = useSelector(state => state.product.products);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // 🔥 LOAD PRODUCTS INTO STORE (once)
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await fetch('/profile/data.json');
        const json = await res.json();

        dispatch(allProduct(json.products || []));

      } catch (err) {
        console.log(err);
      }
    };

    getAllProducts();
  }, [dispatch]);

  // pagination
  const totalPages = Math.ceil(AllProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = AllProducts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 🔥 DELETE FROM REDUX
  const DeleteProductHandler = (id) => {
    dispatch(deleteProduct(id));

    Swal.fire({
      icon: 'success',
      title: 'Deleted',
      text: 'Product removed from store',
    });
  };

  return (
    <>
      <AdminNavbar />

      <Container fluid className="seller text-center">

        <Row>
          <Col>
            <h1>All Products (Redux)</h1>

            <Link to="/admin/create-product">
              <Button style={{ float: 'right' }}>Add Product</Button>
            </Link>
          </Col>
        </Row>

        {currentProducts.length > 0 ? (
          <Row>
            <Col>
              <Table striped bordered hover variant="dark">

                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentProducts.map((product, index) => (
                    <tr key={product._id}>

                      <td>{index + 1 + indexOfFirst}</td>

                      <td>
                        <img
                          src={product.ProductImageUrl}
                          width="100"
                          height="80"
                          alt=""
                        />
                      </td>

                      <td>{product.ProductName}</td>
                      <td>{product.Quantity}</td>
                      <td>{product.Category}</td>
                      <td>{product.Price}</td>

                      <td>

                        <Link to={`/view-product/${product._id}`}>
                          <Button variant="warning" className="m-1">
                            View
                          </Button>
                        </Link>

                        <Link to={`/admin/edit-product/${product._id}`}>
                          <Button variant="success" className="m-1">
                            Edit
                          </Button>
                        </Link>

                        <Button
                          variant="danger"
                          className="m-1"
                          onClick={() => DeleteProductHandler(product._id)}
                        >
                          Delete
                        </Button>

                      </td>

                    </tr>
                  ))}
                </tbody>

              </Table>

              {/* PAGINATION */}
              <Pagination className="justify-content-center">

                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />

                {Array.from({ length: totalPages }).map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />

              </Pagination>

            </Col>
          </Row>
        ) : (
          <h3>No Products Found</h3>
        )}

      </Container>
    </>
  );
};