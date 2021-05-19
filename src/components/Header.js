import react from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      {/* <div className="inner-header"> */}
        <Link to="/home">
          <div className="logo">
            <h1>Banking App</h1>
          </div>
        </Link>
        <ul className="navigation">
          <Link to="/home">
              <li>Home</li>
          </Link>
          <Link to="/customers">
              <li>Customers</li>
          </Link>
          <Link to="/transact">
              <li>Transfer</li>
          </Link>
          <Link to="history">
              <li>Transaction History</li>
          </Link>
        </ul>
      {/* </div> */}
    </div>
  );
};

export default Header;
