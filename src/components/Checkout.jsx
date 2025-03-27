import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { clearCart } from "../store/cartSlice";
import { createOrder } from "../services/api";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const cartItems = useSelector((state) => state.cart.items);

  const tenantId = "bqtg"; 
  const apiKey = "yum-BAPUdN5hTPLuk3iN"; 

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

    try {
      const response = await createOrder(tenantId, orderData, apiKey);
      console.log("Full API response:", JSON.stringify(response, null, 2));

      if (response && response.order) {
        const orderNumber = response.order.id; 
        const eta = response.order.eta; 

        console.log("Order number:", orderNumber);
        console.log("ETA:", eta); 

        dispatch(clearCart());
        alert(`Din beställning är lagd! Ordernummer: ${orderNumber}`);

        navigate("/order-confirmed", {
          state: { 
            orderNumber: orderNumber,
            eta: eta // Skicka eta hit
          }
        });
      } else {
        alert("Något gick fel med beställningen: " + (response.error || "Okänt fel."));
      }
    } catch (error) {
      console.error('Något gick fel vid skapandet av order:', error);
      alert("Ett problem uppstod när du försökte lägga en beställning. Kontrollera console för mer information.");
    }
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
      <button onClick={handleOrder}>Lägg Beställning</button> 
    </div>
  );
}

export default Checkout;