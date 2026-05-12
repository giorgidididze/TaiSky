import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../Admin/Redux/Reducer/authSlice';

export const Forgot = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 USERS FROM REDUX STORE
  const users = useSelector(state => state.auth.users);

  const validate = yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
  });

  const SubmitHandler = (values) => {

    console.log("FORGOT:", values);

    const user = users.find(u => u.email === values.email);

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email not found',
      });
      return;
    }

    // 🔥 generate token
    const resetToken = Math.random().toString(36).substring(2);

    // 🔥 save in redux
    dispatch(forgotPassword({
      email: user.email,
      resetToken: resetToken
    }));

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Reset link generated',
    }).then(() => {
      navigate(`/reset/${resetToken}`);
    });
  };

  return (
    <Container fluid className="main-form d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <div className="bg-white form-wrapper">

            <Formik
              initialValues={{ email: '' }}
              validationSchema={validate}
              onSubmit={SubmitHandler}
            >
              {({ errors, touched }) => (
                <Form className="signup-form">

                  <h2 className="text-center">FORGOT PASSWORD</h2>

                  <div className="form-group">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      placeholder="Enter email"
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <Button type="submit" variant="danger" className="m-2">
                    Send Reset Link
                  </Button>

                </Form>
              )}
            </Formik>

          </div>
        </Col>
      </Row>
    </Container>
  );
};