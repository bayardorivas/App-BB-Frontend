import { useState,useContext } from "react";
import { Form, Formik, Field } from "formik";
import Card from "./card";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "./firebase/base.js";
import UserContext from "./context.js";


const Login = () => {
  const [show, setShow] = useState(true);
  const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();
  const { getUserFromDb, insertUserIntoDb } = useContext(UserContext);

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Field required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Username should be an email";
    }
    return error;
  };

  const validatePass = (value) => {
    let error;
    if (!value) {
      error = "Field required";
    } else if (value.length < 8) {
      error = "Password must be 8 character long";
    }
    return error;
  };

  const handleLogin = async (values,resetForm) => {
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log("Login error: ", error);
      setMessageError("Authentication error, maybe user does not exist");
      resetForm();
    }
  };

  // Google Login
  const handleGoogleLogin = async (values) => {

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const userFromDB = await getUserFromDb(user.uid);
      if (!userFromDB) {
        await insertUserIntoDb(user.uid, user.displayName, user.email,)
      }
   
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessageError("Authentication error, maybe user does not exist");
    }
  };

  const clearForm = () => {
    setShow(true);
  };

  return (
    <div className="row mt-3">
      {messageError && 
      <Alert variant={"danger"}>
       {messageError}
    </Alert>
      }
      <div className="col-6 offset-3">
        <Card
          header="Login"
          body={
            show ? (
              <>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values,{resetForm}) => handleLogin(values,resetForm)}
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
                          name="password"
                          placeholder="****"
                          type="password"
                          validate={validatePass}
                          value={values.password}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password && (
                          <div id="pswError" className="text-danger">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-secondary"
                          id="submitBtn"
                          type="submit"
                          disabled={
                            errors.password ||
                            errors.email ||
                            values.email.length === 0 ||
                            values.password.length === 0
                          }
                        >
                          Login
                        </button>

                        <button
                          className="btn btn-secondary ms-3"
                          type="button"
                          onClick={handleGoogleLogin}
                        >
                          Authenticate with Google
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <div className="alert alert-danger" role="alert">
                  Error login!
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={clearForm}
                >
                  Go back
                </button>
              </>
            )
          }
        />
      </div>
    </div>
  );
};
export default Login;
