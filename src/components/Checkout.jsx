import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { createOrder } from '../services/api'; // Se till att denna funktion finns i din api.js

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items); // Hämta varor från Redux
  const tenantId = "ditt-tenant-id"; // Ersätt med ditt registrerade tenant-id
  const apiKey = "yum-BAPUdN5hTPLuk3iN"; // Använd den API-nyckel du fått

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0); // Räkna priset totalt

  const handleOrder = async () => {
    const orderData = {
      items: cartItems.map(item => item.id), // Lägger till varornas IDs
    };

    const response = await createOrder(tenantId, orderData, apiKey); // Skapa beställningen
    if (response) {
      dispatch(clearCart()); // Töm varukorgen
      alert(`Din beställning är lagd! Ordernummer: ${response.id || 'Ingen information tillgänglig'}`);
    }
  };

  return (
    <div>
      <h2>Din Varukorg</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price} SEK
          </li>
        ))}
      </ul>
      <h3>Total: {totalPrice} SEK</h3>
      <button onClick={handleOrder}>Lägg Beställning</button> {/* Knapp för att beställa */}
    </div>
  );
}

export default Checkout;