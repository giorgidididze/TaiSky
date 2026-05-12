import { Field, Form, Formik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from "yup";

import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '../../Admin/Redux/Reducer/orderSlice';

export const Editaddress = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 GET FROM REDUX
  const edit = useSelector(state => state.order.address);

  const validate = yup.object({
    address: yup.string().max(50).required("Address is required"),
    state: yup.string().min(3).required("State is required"),
    country: yup.string().min(4).required("Country is required"),
    city: yup.string().min(3).required("City is required"),
    phone: yup.string()
      .matches(/^[0-9]{9,12}$/, "Invalid Phone number")
      .required('Phone Number is required'),
    zipcode: yup.string().max(6).required("ZipCode is required")
  });

  const SubmitHandler = (data) => {

    console.log("Updated Address:", data);

    // 🔥 UPDATE REDUX
    dispatch(updateAddress(data));

    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Address updated in store',
    }).then(() => {
      navigate('/order-summary');
    });
  };

  return (
    <Container fluid className="main-form d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <div className="bg-white form-wrapper">

            {edit && (

              <Formik
                enableReinitialize
                initialValues={{
                  country: edit.country || "",
                  state: edit.state || "",
                  phone: edit.phone || "",
                  address: edit.address || "",
                  city: edit.city || "",
                  zipcode: edit.zipcode || "",
                }}
                validationSchema={validate}
                onSubmit={SubmitHandler}
              >

                {({ errors, touched }) => (
                  <Form className="signup-form">

                    <h2 className="text-center">EDIT ADDRESS</h2>

                    <div className="form-group">
                      <label>Address</label>
                      <Field name="address" as="textarea"
                        className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`} />
                    </div>

                    <div className="form-group">
                      <label>City</label>
                      <Field name="city"
                        className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`} />
                    </div>

                    <div className="form-group">
                      <label>Postal Code</label>
                      <Field name="zipcode"
                        className={`form-control ${errors.zipcode && touched.zipcode ? 'is-invalid' : ''}`} />
                    </div>

                    <div className="form-group">
                      <label>Phone</label>
                      <Field name="phone"
                        className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`} />
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      <Field name="state"
                        className={`form-control ${errors.state && touched.state ? 'is-invalid' : ''}`} />
                    </div>

                    <div className="form-group">
                      <label>Country</label>
                      <Field name="country"
                        className={`form-control ${errors.country && touched.country ? 'is-invalid' : ''}`} />
                    </div>

                    <div className="text-center">
                      <Button variant="success" type="submit" className="m-2">
                        Update
                      </Button>

                      <Button variant="danger" className="m-2" onClick={() => navigate(-1)}>
                        Cancel
                      </Button>
                    </div>

                  </Form>
                )}

              </Formik>

            )}

          </div>
        </Col>
      </Row>
    </Container>
  );
};