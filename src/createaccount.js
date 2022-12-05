import { useState, useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { Form, Formik, Field } from 'formik';
import Card from './card';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import UserContext from './context.js';
import { auth } from './firebase/base.js';

const CreateAccount = () => {
  const [show, setShow] = useState(true);
  const { insertUserIntoDb } = useContext(UserContext);
  const [messageError, setMessageError] = useState('');

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Field required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Username should be an email';
    }
    return error;
  };

  const validatePass = (value) => {
    let error;
    if (!value) {
      error = 'Field required';
    } else if (value.length < 8) {
      error = 'Password must be 8 character long';
    }
    return error;
  };

  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Field required';
    }
    return error;
  };

  const handleCreate = async ({ name, email, secret }) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        secret
      );

      if (credentials.user.uid) {
        await insertUserIntoDb(credentials.user.uid, name, email);
        setShow(false);
      }
    } catch (error) {
      console.log(error);
      setMessageError('Account could not be created');
    }
  };

  const clearForm = () => {
    setShow(true);
  };

  return (
    <div className="row mt-3">
      {messageError && <Alert variant={'danger'}>{messageError}</Alert>}
      <div className="col-6 offset-3">
        <Card
          header="Create Account"
          // status={status}
          body={
            show ? (
              <>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    secret: '',
                  }}
                  onSubmit={(values) => handleCreate(values)}
                >
                  {({
                    errors,
                    touched,
                    handleChange,
                    values,
                    isValidating,
                  }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="nameField">Name</label>

                        <Field
                          id="nameField"
                          className="form-control"
                          name="name"
                          placeholder="Please, write name"
                          type="text"
                          validate={validateName}
                          value={values.name}
                          onChange={handleChange}
                        />
                        {errors.name && touched.name && (
                          <div id="nameError" className="text-danger">
                            {errors.name}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="emailField">Email</label>

                        <Field
                          id="emailField"
                          className="form-control"
                          name="email"
                          placeholder="Write an email"
                          type="email"
                          validate={validateEmail}
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email && (
                          <div id="emailError" className="text-danger">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="pswField">Password </label>
                        <Field
                          id="pswField"
                          className="form-control"
                          name="secret"
                          placeholder="****"
                          type="password"
                          validate={validatePass}
                          value={values.secret}
                          onChange={handleChange}
                        />
                        {errors.secret && touched.secret && (
                          <div id="pswError" className="text-danger">
                            {errors.secret}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-secondary"
                          id="submitBtn"
                          type="submit"
                          disabled={
                            errors.name ||
                            errors.email ||
                            errors.secret ||
                            values.name.length === 0 ||
                            values.email.length === 0 ||
                            values.secret.length === 0
                          }
                        >
                          Add new account
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <div className="alert alert-success" role="alert">
                  Account created succesfully!
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={clearForm}
                >
                  Add another user{' '}
                </button>
              </>
            )
          }
        />
      </div>
    </div>
  );
};
export default CreateAccount;
