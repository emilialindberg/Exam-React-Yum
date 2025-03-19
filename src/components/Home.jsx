import React from 'react';
import { Link } from 'react-router-dom';

//komponent för startsida med länk till meny

function Home() {
  return (
    <div>
      <Link to="/menu">
      </Link>
    </div>
  );
}

export default Home;