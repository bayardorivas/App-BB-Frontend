import { useContext } from "react";
import UserContext from "./context";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/base";


const NavBar = () => {
  const navigate = useNavigate();
  
  const { currentUser, setCurrentUser } = useContext(UserContext);
  
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.log(error); 
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* This is the Brand Navbar */}
          <Navbar.Brand href="#">BR Bad Bank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* This is the left-side Navbar with the dropdown */}
            {currentUser && (
              <>
                <Nav className="me-auto">
                  <Nav.Link title="BR Bank Home Page" href="#/" active>
                    Home
                  </Nav.Link>

                  <NavDropdown title="Admin" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      title="Create new client account"
                      href="#/CreateAccount/"
                    >
                      Create Account
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      title="View clients information"
                      href="#/AllData/"
                    >
                      My All Data
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={currentUser.email}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item title="Make a deposit" href="#/Deposit/">
                      Deposit
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      title="Make a withdraw"
                      href="#/WithDraw/"
                    >
                      Withdraw
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>

                <Nav>
                  <Navbar.Text>
                    <button
                      className="btn btn-link"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </Navbar.Text>
                </Nav>
              </>
            )}
            {/* This is the right-side Navbar  */}

            {!currentUser && (
              <Nav className="ms-auto">
                <Nav.Link title="Login" href="#/Login/">
                  Login
                </Nav.Link>
                <Nav.Link title="CreateAccount" href="#/CreateAccount/">
                  Create Account
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
