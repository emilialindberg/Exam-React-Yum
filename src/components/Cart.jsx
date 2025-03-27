import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../store/cartSlice'; // Importera removeItem
import { Link } from 'react-router-dom';
import styles from '../styles/Cart.module.scss'; // Importera din SCSS-fil

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items); // Hämta varor från varukorgens tillstånd

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem({ id: itemId }));
  };

  // Beräkna totalpris
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeader}>Din Varukorg</h2>
      {cartItems.length === 0 ? (
        <p>Du har inga varor i din varukorg.</p>
      ) : (
        <ul className={styles.cartItem}>
          {cartItems.map(item => (
            <li key={item.id} className={styles.cartListItem}>
              <div className={styles.itemDetails}>
                <span className={styles.itemName}>
                  {item.name} 
                  {item.quantity > 1 && <span className={styles.itemQuantity}> x{item.quantity}</span>}
                </span>
                <span className={styles.itemPrice}>{item.price} SEK</span>
              </div>
              <button className={styles.removeItem} onClick={() => handleRemoveItem(item.id)}>Ta bort</button>
            </li>
          ))}
        </ul>
      )}
      <h3 className={styles.total}>Totalt: {totalAmount.toFixed(2)} SEK</h3>
      {cartItems.length > 0 && (
        <Link to="/order-confirmed">
          <button className={styles.moneyButton}>Take My Money!</button>
        </Link>
      )}

      <Link to="/">
        <button className={styles.newOrderButton}>Tillbaka till Menyn</button>
      </Link>
    </div>
  );
}

export default Cart;