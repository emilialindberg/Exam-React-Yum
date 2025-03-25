import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Checkout.module.scss';
import headerstyles from '../styles/Header.module.scss';

//ikon och länk till varukorg, navigerar mellan sidor via Link. Just nu utan funktionalitet för att visa antal varor.

function Header() {
  return (
    <header>
      <img src="../img/logo.png" alt="Yum Yum Gimme Sum" />
      <Link to="/cart"> {/*länkas till varukorgssidan*/}
        <img src="../img/cart.svg" alt="Cart" />
        {/* Här kan du senare lägga till antalet varor i korgen */}
      </Link>
    </header>
  );
}

export default Header;