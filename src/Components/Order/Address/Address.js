import { Field, Form, Formik } from 'formik';
import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { setAddress } from '../../Admin/Redux/Reducer/orderSlice';

export const Address = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = yup.object({
    address: yup.string().max(50).required("Address is required"),
    state: yup.string().min(3).required("State is required"),
    country: yup.string().min(4).required("Country is required"),
    city: yup.string().min(3).required("City is required"),
    phone: yup.string()
      .matches(/^[0-9]{9,12}$/, "Invalid Phone number")
      .required('Phone Number is required'),
    pincode: yup.string().max(6).required("ZipCode is required")
  });

  const SubmitHandler = (data, { resetForm }) => {

    console.log("Address:", data);

    // 🔥 SAVE TO REDUX
    dispatch(setAddress(data));

    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Address saved in Redux store',
    }).then(() => {
      resetForm();
      navigate("/checkout"); // ან სადაც გინდა
    });
  };

  return (
    <Container fluid className="main-form d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <div className="bg-white form-wrapper">

            <Formik
              initialValues={{
                country: "",
                state: "",
                phone: "",
                address: "",
                city: "",
                pincode: "",
              }}
              validationSchema={validate}
              onSubmit={SubmitHandler}
            >
              {({ errors, touched }) => (
                <Form className="signup-form">

                  <h2 className="text-center">ADD ADDRESS</h2>

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
                    <Field name="pincode"
                      className={`form-control ${errors.pincode && touched.pincode ? 'is-invalid' : ''}`} />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
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
                      Add
                    </Button>
                    <Button variant="danger" type="reset" className="m-2">
                      Reset
                    </Button>
                  </div>

                </Form>
              )}
            </Formik>

          </div>
        </Col>
      </Row>
    </Container>
  );
};