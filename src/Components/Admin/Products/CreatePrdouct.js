import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { createProduct } from "../Redux/Reducer/productSlice";

export const CreateProduct = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = yup.object({
    ProductImageUrl: yup.string().required(),
    ProductName: yup.string().required(),
    Category: yup.string().required(),
    Description: yup.string().min(10).required(),
    Quantity: yup.number().required(),
    Price: yup.number().required(),
  });

  const SubmitHandler = (values, { resetForm }) => {

    const newProduct = {
      _id: Date.now().toString(),
      ...values,
    };

    dispatch(createProduct(newProduct));

    Swal.fire({
      icon: "success",
      text: "Product created (Redux)",
    }).then(() => {
      resetForm();
      navigate("/admin/list-products");
    });

  };

  return (
    <Container fluid className="seller">

      <Row>
        <h1 className="text-center">Create Product</h1>
      </Row>

      <Row>
        <Col>
          <div className="bg-white form-wrapper">

            <Formik
              initialValues={{
                ProductImageUrl: "",
                ProductName: "",
                Category: "",
                Description: "",
                Quantity: "",
                Price: "",
              }}
              validationSchema={validate}
              onSubmit={SubmitHandler}
            >
              {({ errors, touched }) => (
                <Form>

                  <Field name="ProductImageUrl" className="form-control m-1" placeholder="Image URL" />
                  <Field name="ProductName" className="form-control m-1" placeholder="Name" />

                  <Field as="select" name="Category" className="form-control m-1">
                    <option value="">Select Category</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Electronics">Electronics</option>
                  </Field>

                  <Field
                    name="Description"
                    as="textarea"
                    className="form-control m-1"
                    placeholder="Description"
                  />

                  <Field name="Quantity" type="number" className="form-control m-1" />
                  <Field name="Price" type="number" className="form-control m-1" />

                  <div className="text-center">
                    <Button type="submit">Create</Button>
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