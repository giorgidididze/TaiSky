import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../Admin/Redux/Reducer/authSlice';

export const Reset = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 ALL USERS FROM STORE
  const users = useSelector(state => state.auth.users);

  const validate = yup.object({
    email: yup.string().email().required('Required'),
    password: yup.string().min(6).required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Required')
  });

  const SubmitHandler = (values, { resetForm }) => {

    console.log("RESET DATA:", values);

    // 🔥 find user in store
    const user = users.find(u => u.email === values.email);

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "User not found"
      });
      return;
    }

    // 🔥 dispatch update
    dispatch(resetPassword({
      email: values.email,
      newPassword: values.password
    }));

    Swal.fire({
      icon: "success",
      title: "Password updated"
    }).then(() => {
      resetForm();
      navigate("/login");
    });
  };

  return (
    <Container fluid className="main-form d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <div className="form-wrapper bg-white">

            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: ""
              }}
              validationSchema={validate}
              onSubmit={SubmitHandler}
            >
              {({ errors, touched }) => (
                <Form>

                  <h2>RESET PASSWORD</h2>

                  {/* EMAIL */}
                  <div>
                    <label>Email</label>
                    <Field name="email" className="form-control" />
                    {errors.email && touched.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label>Password</label>
                    <Field name="password" type="password" className="form-control" />
                    {errors.password && touched.password && (
                      <p className="text-danger">{errors.password}</p>
                    )}
                  </div>

                  {/* CONFIRM */}
                  <div>
                    <label>Confirm</label>
                    <Field name="confirmPassword" type="password" className="form-control" />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-danger">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button type="submit" className="mt-3">
                    Reset
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