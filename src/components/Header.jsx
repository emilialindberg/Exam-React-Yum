import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../styles/Header.module.scss';

function Header() {
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items in the cart

  return (
    <header className={styles.header}>
      <img src="../img/logo.png" alt="Yum Yum Gimme Sum" className={styles.headerIcon} />
      <Link to="/cart" className={styles.cartLink}>
        <img src="../img/cart.svg" alt="Cart" className={styles.cartIcon} />
        {totalItems > 0 && (
          <span className={styles.cartCount}>{totalItems}</span>
        )}
      </Link>
    </header>
  );
}

export default Header;