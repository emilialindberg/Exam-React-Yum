import React from 'react';
import { Link } from 'react-router-dom';

//ikon och länk till varukorg, navigerar mellan sidor via Link. Just nu utan funktionalitet för att visa antal varor.

function Header() {
  return (
    <header>
      <img src="img/logo.png" alt="Yum Yum Gimme Sum" />
      <Link to="/cart"> {/*länkas till cart-sida*/}
        <img src="img/cart-icon.png" alt="Cart" />
        {/* Här kan du senare lägga till antalet varor i korgen */}
      </Link>
    </header>
  );
}

export default Header;