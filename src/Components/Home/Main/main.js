import React, { useEffect, useCallback } from 'react';
import { Cards } from '../Card/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { Footer } from '../Footer';
import { Header } from '../Navbar/navbar';

import { AdminNavbar } from '../../Admin/Navbar/navbar';

import { useDispatch, useSelector } from 'react-redux';

import {
  allProduct,
  setSearchTerm
} from '../../Admin/Redux/Reducer/productSlice';

export const Main = () => {

  const dispatch = useDispatch();

  // 🔥 PRODUCTS
  const products = useSelector(
    state => state.product.products
  );

  // 🔥 SEARCH
  const searchTerm = useSelector(
    state => state.product.searchTerm
  );

  // 🔥 CURRENT USER
  const currentUser = useSelector(
    state => state.auth.currentUser
  );

  // 🔥 LOAD PRODUCTS
  const getAllProducts = useCallback(async () => {

    try {

      const res = await fetch('/data.json');

      const data = await res.json();

      dispatch(allProduct(data.products || []));

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch products',
      });
    }

  }, [dispatch]);

  // 🔥 FIRST LOAD
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // 🔥 FILTER PRODUCTS
  const filteredProducts = (products || []).filter((item) => {

    const name = item?.ProductName ?? '';

    return name
      .toLowerCase()
      .includes((searchTerm ?? '').toLowerCase());

  });

  // 🔥 SORT PRODUCTS
  const handleSort = (event) => {

    const option = event.target.value;

    let sorted = [...filteredProducts];

    if (option === 'lowToHigh') {

      sorted.sort((a, b) => a.Price - b.Price);

    } else if (option === 'highToLow') {

      sorted.sort((a, b) => b.Price - a.Price);
    }

    dispatch(allProduct(sorted));
  };

  return (
    <>

      {/* 🔥 ROLE BASED NAVBAR */}
      {
        currentUser?.role === "admin"
          ? <AdminNavbar />
          : <Header />
      }

      <Container fluid>

        {/* 🔥 SEARCH */}
        <Row>

          <Col className='ms-auto m-3'>

            <Form>

              <Row>

                <Col sm={10}>

                  <Form.Control
                    type='search'
                    placeholder='Search product'
                    value={searchTerm}
                    onChange={(e) =>
                      dispatch(setSearchTerm(e.target.value))
                    }
                  />

                </Col>

                <Col>

                  <Button variant='outline-danger'>
                    Search
                  </Button>

                </Col>

              </Row>

            </Form>

          </Col>

        </Row>

        {/* 🔥 SORT */}
        <Row>

          <Col
            xs={12}
            md={4}
            lg={3}
            className='ms-auto mb-3'
          >

            <Form.Select onChange={handleSort}>

              <option value=''>
                Select
              </option>

              <option value='lowToHigh'>
                Low to High
              </option>

              <option value='highToLow'>
                High to Low
              </option>

            </Form.Select>

          </Col>

        </Row>

        {/* 🔥 PRODUCTS */}
        <Row>

          {
            filteredProducts.length > 0 ? (

              filteredProducts.map((item) => (

                <Col
                  key={item._id || item.id}
                >

                  <Cards values={item} />

                </Col>

              ))

            ) : (

              <h5 className='text-center'>
                No data found
              </h5>

            )
          }

        </Row>

      </Container>

      <Footer />

    </>
  );
};