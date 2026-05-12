import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Admin/Redux/Reducer/authSlice';

export const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ auth slice from redux
  const users = useSelector(state => state.auth.users);

  const validate = yup.object({
    firstname: yup.string().min(3).max(20).required('Required'),
    lastname: yup.string().min(3).max(20).required('Required'),
    username: yup.string().min(4).max(20).required('Required'),
    email: yup.string().email().required('Required'),
    password: yup.string().min(6).max(20).required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Required'),
  });

  const SubmitHandler = (data, { resetForm }) => {

    console.log("SUBMIT FIRED", data);

    // 🔴 check duplicate email in redux
    const exists = users.find(u => u.email === data.email);

    if (exists) {
      Swal.fire({
        icon: 'error',
        title: 'User exists',
        text: 'This email is already registered',
      });
      return;
    }

    const newUser = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      isAdmin: false,
    };

    // ✅ Redux register
    dispatch(registerUser(newUser));

    Swal.fire({
      icon: 'success',
      title: 'Registered!',
      text: 'User created successfully',
    }).then(() => {
      resetForm();
      navigate("/login");
    });
  };

  return (
    <Container fluid className="main-form d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <div className="bg-white form-wrapper">

            <Formik
              initialValues={{
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validate}
              onSubmit={SubmitHandler}
            >
              {({ errors, touched }) => (
                <Form className="signup-form">

                  <h2 className="text-center">SIGN UP</h2>

                  <div className="form-group">
                    <label>Firstname</label>
                    <Field name="firstname" className="form-control" />
                    {errors.firstname && touched.firstname && (
                      <small className="text-danger">{errors.firstname}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Lastname</label>
                    <Field name="lastname" className="form-control" />
                    {errors.lastname && touched.lastname && (
                      <small className="text-danger">{errors.lastname}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    <Field name="username" className="form-control" />
                    {errors.username && touched.username && (
                      <small className="text-danger">{errors.username}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <Field name="email" className="form-control" />
                    {errors.email && touched.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <Field type="password" name="password" className="form-control" />
                    {errors.password && touched.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <Field type="password" name="confirmPassword" className="form-control" />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <small className="text-danger">{errors.confirmPassword}</small>
                    )}
                  </div>

                  <div className="text-center">
                    <Button type="submit" variant="primary" className="m-1">
                      Submit
                    </Button>
                    <Button type="reset" variant="danger" className="m-1">
                      Reset
                    </Button>
                  </div>

                  <p className="text-center mt-3">
                    Already registered? <a href="/login">Login</a>
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