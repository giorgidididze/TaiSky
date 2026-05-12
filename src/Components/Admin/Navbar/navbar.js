import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Col, Image, Row } from "react-bootstrap";
import FullLogo from "../../../FullLogo.png";

import { useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Reducer/authSlice";
import { useNavigate } from "react-router-dom";

export const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Navbar style={{ background: "#f2d0e6" }} expand="lg" sticky='top'>
      <Container fluid>

        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
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

        <Navbar.Toggle />
        <Navbar.Collapse>

        <Nav className="ms-auto d-flex gap-3">

            <Button 
            variant="outline-success"
              onClick={() => navigate("/admin-dashboard")}
            >
              DASHBOARD
            </Button>

            <Button
              variant="outline-success"
              onClick={() => navigate("/admin/list-users")}
            >
              USERS
            </Button>

            <Button
              variant="outline-success"
              onClick={() => navigate("/admin/list-products")}
            >
              PRODUCTS
            </Button>

            <Button
              variant="outline-success"
              onClick={() => navigate("/admin/list-orders")}
            >
              ORDERS AND STATUS
            </Button>

            <Button
              variant="outline-dark"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};