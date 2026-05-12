import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { activateUser } from '../Admin/Redux/Reducer/authSlice';

export const Activate = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeToken } = useParams();

  // 🔥 USERS FROM STORE (for validation)
  const users = useSelector(state => state.auth.users);

  const [activationStatus, setActivationStatus] = useState(null);

  const SubmitHandler = () => {

    console.log("ACTIVATE TOKEN:", activeToken);

    if (!activeToken) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Activation token missing',
      });
      return;
    }

    // 🔥 check token exists in redux
    const user = users.find(u => u.activationToken === activeToken);

    if (!user) {
      setActivationStatus(false);

      Swal.fire({
        icon: 'error',
        title: 'Invalid token',
        text: 'Activation failed',
      }).then(() => {
        navigate('/register');
      });

      return;
    }

    // 🔥 activate in redux
    dispatch(activateUser(activeToken));

    setActivationStatus(true);

    Swal.fire({
      icon: 'success',
      title: 'Activated!',
      text: 'Your account is now active',
    }).then(() => {
      navigate('/login');
    });
  };

  return (
    <Container fluid className='main-form d-flex align-items-center justify-content-center'>
      <Row>
        <Col>
          <div className='bg-white form-wrapper'>

            <div className='m-3'>

              {activationStatus === true ? (
                <div className='text-center'>
                  <p>Account successfully activated.</p>
                  <p>You can now login.</p>
                </div>
              ) : (
                <Formik initialValues={{}} onSubmit={SubmitHandler}>
                  {({ handleSubmit }) => (
                    <Form className='signup-form'>

                      <h2 className='text-center'>ACTIVATION</h2>

                      <p className='text-danger text-center'>
                        Click below to activate account
                      </p>

                      <div className='text-center'>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          onClick={handleSubmit}
                        >
                          Activate Account
                        </button>
                      </div>

                    </Form>
                  )}
                </Formik>
              )}

              {activationStatus === false && (
                <div className='text-center'>
                  <p>Activation failed. Invalid token.</p>
                </div>
              )}

            </div>

          </div>
        </Col>
      </Row>
    </Container>
  );
};