import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Admin/Redux/Reducer/authSlice';

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 USERS FROM STORE
  const users = useSelector(state => state.auth.users);

  // 🔥 CREATE ADMIN ONCE
  useEffect(() => {

    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const adminExists = storedUsers.find(
      u => u.role === "admin"
    );

    if (!adminExists) {

      const adminUser = {
        id: 0,
        email: "admin@gmail.com",
        password: "123456",
        isAdmin: true,
        role: "admin"
      };

      localStorage.setItem(
        "users",
        JSON.stringify([...storedUsers, adminUser])
      );
    }

  }, []);

  const validate = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const SubmitHandler = (values) => {

    console.log("LOGIN TRY:", values);

    // 🔥 CHECK USER
    const foundUser = users.find(
      (u) =>
        u.email === values.email &&
        u.password === values.password
    );

    if (!foundUser) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Email or password is incorrect",
      });

      return;
    }

    // 🔥 LOGIN
    dispatch(loginUser(values));

    Swal.fire({
      icon: "success",
      title: "Welcome",
      text: "Login successful",
    }).then(() => {

      // 🔥 ADMIN REDIRECT
      if (foundUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    });
  };

  return (
    <Container fluid className="main-form d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <div className="form-wrapper bg-white">

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validate}
              onSubmit={SubmitHandler}
            >
              {({ errors, touched }) => (
                <Form className="signup-form">

                  <h2 className="text-center">LOGIN</h2>

                  <div className="form-group">
                    <label>Email</label>

                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                    />

                    {errors.email && touched.email && (
                      <p className="text-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Password</label>

                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />

                    {errors.password && touched.password && (
                      <p className="text-danger">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="text-center">
                    <Button type="submit" variant="primary">
                      Login
                    </Button>
                  </div>

                  <p className="text-center mt-3">
                    No account? <a href="/register">Sign up</a>
                  </p>

                </Form>
              )}
            </Formik>

          </div>
        </Col>
      </Row>
    </Container>
  );
};