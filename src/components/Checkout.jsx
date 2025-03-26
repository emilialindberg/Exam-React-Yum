import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 🔹 Importera navigate
import { clearCart } from "../store/cartSlice";
import { createOrder } from "../services/api"; // Importera createOrder

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🔹 Lägg till navigate för att navigera efter beställning
  const cartItems = useSelector((state) => state.cart.items);

  // Definiera tenantId och apiKey här
  const tenantId = "bqtg"; // Byt ut detta med din registrerade tenant ID
  const apiKey = "yum-BAPUdN5hTPLuk3iN"; // Din API-nyckel

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      alert("Din varukorg är tom! Lägg till varor innan du beställer.");
      return;
    }
  
    const orderData = {
      items: cartItems.map(item => item.id),
    };
  
    console.log("Order Data:", orderData);
  
    const response = await createOrder(tenantId, orderData, apiKey);
    console.log("Full API response:", response);
  
    if (response && response.order) {
      dispatch(clearCart()); // Töm varukorgen
      alert(`Din beställning är lagd! Ordernummer: ${response.order.id}`);
  
      // 🔹 Navigera till OrderConfirmed och skicka med ordernumret och ETA
      navigate("/order-confirmed", {
        state: { orderNumber: response.order.id, eta: response.order.eta }
      });
    } else {
      alert("Något gick fel med beställningen: " + (response.error || "Okänt fel."));
    }
  
    console.log("Error response:", response);
  };

  return (
    <div>
      <h2>Din Varukorg</h2>
      <ul>
        {cartItems.map((item) => (
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