import { Routes, Route, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./home";
import Withdraw from "./withdraw";
import NavBar from "./navbar";
import CreateAccount from "./createaccount";
import AllData from "./alldata";
import Login from "./login";
import Deposit from "./deposit";
import { UserProvider } from "./context";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <HashRouter>
      <UserProvider>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createAccount/" element={<CreateAccount />} />
            <Route path="/allData/" element={<AllData />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="*" element={<h1>Page not Found</h1>} />
          </Routes>
        </Container>
      </UserProvider>
    </HashRouter>
  );
};
export default App;
