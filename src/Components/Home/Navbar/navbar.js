import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Col, Image, Row } from 'react-bootstrap';
import FullLogo from "../../../FullLogo.png";

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Admin/Redux/Reducer/authSlice';

export const Header = () => {

  const dispatch = useDispatch();

  // 🔥 cart count
  const count = useSelector(state => state.cart?.items?.length || 0);

  // 🔥 redux auth state (NO localStorage)
  const isAuth = useSelector(state => state.auth?.isAuth);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = '/';
  };

  return (
    <Navbar style={{ background: "#f2d0e6" }} expand="lg" sticky='top'>
      <Container fluid>

        <Navbar.Brand href="#" className="text-white">
          <Row>
            <Col>
              <Image src={FullLogo} alt='logo' width={120} />
            </Col>

            <Col className='mt-4'>
              <h2 style={{
                fontFamily: "Pacifico, cursive",
                color: "black",
                fontStyle: "oblique"
              }}>
                TaiSky
              </h2>
            </Col>
          </Row>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto mt-2">

            <Nav.Link href="/">
              <Button variant="outline-dark">HOME</Button>
            </Nav.Link>

            {isAuth ? (
              <Nav.Link>
                <Button variant="outline-dark" onClick={handleLogout}>
                  LOGOUT
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">
                <Button variant="outline-dark">
                  SIGN IN
                </Button>
              </Nav.Link>
            )}

            <Nav.Link href="/view-cart/" className="d-flex align-items-center">

              <FontAwesomeIcon
                icon={faShoppingCart}
                size="2x"
              />

              <Badge
                pill
                bg="transparent"
                style={{
                  position: 'absolute',
                  right: 24,
                  top: 48,
                  color: 'red'
                }}
              >
                {count}
              </Badge>

            </Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};