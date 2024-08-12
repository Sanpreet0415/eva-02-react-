import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Assuming you want to add custom styles

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the Travel Planning App</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/category/Adventure" className="nav-link">
              Adventure
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/category/Leisure" className="nav-link">
              Leisure
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/category/Cultural" className="nav-link">
              Cultural
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
