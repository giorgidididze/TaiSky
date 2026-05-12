import React, { useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateProduct, viewProduct } from "../../Admin/Redux/Reducer/productSlice";

export const UpdateProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 FROM REDUX STORE
  const edit = useSelector(state => state.product.selectedProduct);

  const validate = yup.object({
    ProductImageUrl: yup.string().required(),
    ProductName: yup.string().required(),
    Category: yup.string().required(),
    Description: yup.string().min(10).required(),
    Quantity: yup.number().required(),
    Price: yup.number().required(),
  });

  // 🔥 LOAD PRODUCT FROM STORE
  const loadProduct = useCallback(() => {
    dispatch(viewProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  // 🔥 UPDATE PRODUCT IN STORE
  const SubmitHandler = (values) => {

    dispatch(updateProduct({
      _id: id,
      ...values
    }));

    Swal.fire({
      icon: "success",
      text: "Product updated successfully",
    }).then(() => {
      navigate("/admin/list-products");
    });
  };

  return (
    <Container fluid className="seller">

      <Row>
        <h1 className="text-center">Update Product</h1>
      </Row>

      <Row>
        <Col>

          {edit && (

            <div className="bg-white form-wrapper">

              <Formik
                initialValues={{
                  ProductImageUrl: edit.ProductImageUrl || "",
                  ProductName: edit.ProductName || "",
                  Category: edit.Category || "",
                  Description: edit.Description || "",
                  Quantity: edit.Quantity || "",
                  Price: edit.Price || "",
                }}
                enableReinitialize
                validationSchema={validate}
                onSubmit={SubmitHandler}
              >

                {({ errors, touched }) => (
                  <Form>

                    <Field name="ProductImageUrl" className="form-control m-1" />
                    <Field name="ProductName" className="form-control m-1" />

                    <Field as="select" name="Category" className="form-control m-1">
                      <option value="Mobile">Mobile</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Electronics">Electronics</option>
                    </Field>

                    <Field as="textarea" name="Description" className="form-control m-1" />

                    <Field name="Quantity" type="number" className="form-control m-1" />
                    <Field name="Price" type="number" className="form-control m-1" />

                    <div className="text-center">
                      <Button type="submit">Update</Button>
                    </div>

                  </Form>
                )}

              </Formik>

            </div>

          )}

        </Col>
      </Row>

    </Container>
  );
};