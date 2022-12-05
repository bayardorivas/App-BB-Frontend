import { Field, Formik, Form } from 'formik';
import { useContext, useState, useEffect } from 'react';
import Card from './card';
import UserContext from './context';

const Deposit = () => {
  const { currentUser, addTransaction, getUserFromDb } =
    useContext(UserContext);

  const [show, setShow] = useState(true);
  const [btnSubmit, setBtnSubmit] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const { balance } = await getUserFromDb(currentUser.uid);
        setBalance(balance);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [show, currentUser.uid, getUserFromDb]);

  const validateAmount = (value) => {
    let error;
    if (!value) {
      error = 'Field required';
    } else if (value <= 0) {
      error = 'Amount must be greater than zero';
    }
    setBtnSubmit(false);
    return error;
  };

  const handleSubmit = (values) => {
    const transaction = {
      amount: values.amount,
      transactionType: 'DEPOSIT',
    };
    addTransaction(transaction);
    setShow(false);
  };

  return (
    <>
      <div className="row mt-3">
        <div className="col-6 offset-3">
          <Card
            // bgcolor="secondary"
            header="Make your deposit"
            body={
              show ? (
                <>
                  <Formik
                    initialValues={{
                      amount: '',
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({ errors, touched, handleChange, values, isValid }) => (
                      <Form>
                        <div className="mb-3">
                          <h2>Current Balance: {balance}</h2>

                          <label htmlFor="amount">Amount to deposit</label>

                          <Field
                            id="amount"
                            className="form-control"
                            name="amount"
                            type="number"
                            validate={validateAmount}
                            value={values.amount}
                            onChange={handleChange}
                          />
                          {errors.amount && touched.amount && (
                            <div
                              id="amountError"
                              className="form-text text-danger"
                            >
                              {errors.amount}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <button
                            className="btn btn-secondary"
                            id="submitBtn"
                            type="submit"
                            // disabled={!isValid}
                            // disabled={errors.amount}
                            disabled={btnSubmit}
                          >
                            Deposit
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              ) : (
                <>
                  <div className="alert alert-success" role="alert">
                    Deposit succesfully
                  </div>
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={(e) => {
                      setShow(true);
                      setBtnSubmit(true);
                    }}
                  >
                    Go back
                  </button>
                </>
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default Deposit;
