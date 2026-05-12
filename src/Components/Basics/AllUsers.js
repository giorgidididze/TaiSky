import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { AdminNavbar } from '../Admin/Navbar/navbar';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../Admin/Redux/Reducer/authSlice';

export const AllUsers = () => {

  const dispatch = useDispatch();

  // 🔥 USERS FROM REDUX STORE
  const users = useSelector(state => state.auth.users);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const totalPages = Math.ceil(users.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <AdminNavbar />

      <Container fluid className='seller text-center'>
        <Row>
          <Col>
            <h1>All Users</h1>
          </Col>
        </Row>

        <Row className='m-auto p-auto'>
          <Col>

            <Table responsive bordered hover className='table-adjust'>
              <thead>
                <tr className='studentvalues'>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>{index + 1 + indexOfFirstUser}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>

                      <div style={{ cursor: 'pointer' }}>

                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-primary m-2"
                        />

                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className='text-danger m-2'
                          onClick={() => handleDelete(user.id)}
                        />

                      </div>

                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>

            <div className='d-flex justify-content-center'>
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