import { useContext, useState, useEffect } from 'react';
import UserContext from './context';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row } from 'react-bootstrap';

const AllData = () => {
  const { currentUser, getUserFromDb } = useContext(UserContext);

  const [user, setUser] = useState({ transactions: [] });

  useEffect(() => {
    (async () => {
      const userFromDB = await getUserFromDb(currentUser.uid);
      setUser(userFromDB);
    })();
  }, [currentUser, getUserFromDb]);

  return (
    <>
      <div className="row mt-3">
        <Row md={3} className="g-4">
          <Card>
            <Card.Body>
              <Card.Title>Account name: {user.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                User name: {user.email}
              </Card.Subtitle>
              <Card.Text className="text-end fs-5">
                Balance: {user.balance}{' '}
              </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              {user.transactions.length === 0 ? (
                <ListGroup.Item>
                  No new transactios for this client.
                </ListGroup.Item>
              ) : (
                user.transactions.map((trans, index) => (
                  <ListGroup.Item
                    className={
                      trans.transactionType === 'DEPOSIT'
                        ? 'text-primary'
                        : 'text-danger'
                    }
                    key={index}
                  >
                    {trans.transactionType} {trans.amount}
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Row>
      </div>
    </>
  );
};

export default AllData;
