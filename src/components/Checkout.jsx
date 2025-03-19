import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../services/api'; // Rätt sökväg för att importera createOrder
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Skapa en instans av useNavigate
  const cartItems = useSelector(state => state.cart.items);
  const [tenantId, setTenantId] = useState('your-tenant-id'); // Ersätt med ditt tenant ID
  const [apiKey, setApiKey] = useState('');

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleOrder = async () => {
    const orderData = {
      items: cartItems, // Anta att du skickar varorna som de är
      total: totalPrice,
    };

    const response = await createOrder(tenantId, orderData, apiKey); // Skicka beställningen
    if (response) {
      dispatch(clearCart()); // Töm varukorgen
      // Navigera till OrderConfirmed-sidan och skicka ordernumret
      navigate('/order-confirmed', { state: { orderNumber: response.orderNumber } }); // Skickar ordernumret
    }
  };

  return (
    <div>
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
