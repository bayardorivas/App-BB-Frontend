import Card from "./card";
import bankimage from "./images/bank.png";

const Home = () => {
  return (
    <div className="row mt-3">
      <div className="col-6 offset-3">
        <Card
          header="Bad Bank Landing Page"
          title="Welcome to BR - Bad Bank"
          text=""
          body={
            <div className="text-center">
              <img
                id="logo"
                src={bankimage}
                className="img-fluid"
                alt="Responsive"
              />
            </div>
          }
        />
      </div>
      <div className="col-6 offset-3 text-center">
        <p>This project is created by <a href="https://github.com/bayardorivas" className="link-primary">Bayardo Rivas </a>
        under "MIT License" as the Front-End Project</p>

      </div>
    </div>
  );
};

export default Home;
