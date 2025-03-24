import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom'; 
import { createOrder } from '../services/api'; 
import styles from '../styles/Checkout.module.scss'; // Importera stilar

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const cartItems = useSelector(state => state.cart.items);
  const [tenantId, setTenantId] = useState('your-tenant-id'); 
  const [apiKey, setApiKey] = useState('');

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleOrder = async () => {
    const orderData = {
      items: cartItems, 
      total: totalPrice,
    };

    const response = await createOrder(tenantId, orderData, apiKey); 
    if (response) {
      dispatch(clearCart()); 
      navigate('/order-confirmed', { state: { orderNumber: response.orderNumber } });
    }
  };

  return (
    <div className={styles.checkoutContainer}> {/* Använd className här */}
      <h2>Din Varukorg</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>{item.name} - {item.price} SEK</li>
        ))}
      </ul>
      <h3>Total: {totalPrice} SEK</h3>
      <button onClick={handleOrder}>Lägg Beställning</button>
    </div>
  );
}

export default Checkout;