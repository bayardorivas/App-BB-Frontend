import { useState, useEffect, createContext } from 'react';
import { auth } from './firebase/base';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const mongoUser = await getUserFromDb(currentUser.uid);
      transaction['user'] = mongoUser._id;

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/transactions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction),
        }
      );
      if (response.status !== 200) return null;

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFromDb = async (firebaseId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${firebaseId}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      if (response.status !== 200) return null;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const insertUserIntoDb = async (firebaseId, name, email) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firebaseId,
            name,
            email,
          }),
        }
      );

      const data = await response.json();
      if (response.status !== 200) return null;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        addTransaction,
        getUserFromDb,
        insertUserIntoDb,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
