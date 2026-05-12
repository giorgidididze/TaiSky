import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import Pagination from 'react-bootstrap/Pagination';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { AdminNavbar } from '../../Admin/Navbar/navbar';

import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, viewOrder } from '../../Admin/Redux/Reducer/orderSlice';

export const Orderlist = () => {

  const dispatch = useDispatch();

  const orders = useSelector(state => state.order.orders);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const totalPages = Math.ceil(orders.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentOrders = orders.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const orderView = (order) => {
    dispatch(viewOrder(order.id));
    console.log("View:", order);
  };

  const removeOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <>
      <AdminNavbar />

      <Container fluid className="seller text-center">
        <Row>
          <Col>
            <h1>All Orders</h1>
          </Col>
        </Row>

        <Row className="m-auto p-auto">
          <Col>

            <Table responsive bordered hover className="table-adjust">
              <thead>
                <tr className="studentvalues">
                  <th>S.No</th>
                  <th>Email</th>
                  <th>Order ID</th>
                  <th>Payment ID</th>
                  <th>Product ID</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1 + indexOfFirstProduct}</td>
                    <td>{order.email}</td>
                    <td>{order.orderId}</td>
                    <td>{order.paymentId}</td>
                    <td>{order.productId}</td>
                    <td>{order.orderStatus}</td>

                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-primary m-2"
                        onClick={() => orderView(order)}
                      />

                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-danger m-2"
                        onClick={() => removeOrder(order.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>

            <div className="d-flex justify-content-center">
              <Pagination>

                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />

              </Pagination>
            </div>

          </Col>
        </Row>
      </Container>
    </>
  );
};