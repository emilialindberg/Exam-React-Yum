import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // 🔹 Glömde importera navigate!
import { fetchReceipt } from "../services/api"; 
import styles from "../styles/OrderConfirmed.module.scss"; 

function OrderConfirmed() {
  const location = useLocation();
  const navigate = useNavigate(); // 🔹 Lägg till navigate för att kunna navigera tillbaka till menyn

  const orderNumber = location.state?.orderNumber;
  const eta = location.state?.eta; // 🔹 Hämta ETA direkt från Checkout
  const [receiptData, setReceiptData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null); // 🆕 Lägger till state för ETA-nedräkning

  useEffect(() => {
    if (eta) {
      const interval = setInterval(() => {
        const now = new Date();
        const etaTime = new Date(eta);
        const diffInMinutes = Math.max(0, Math.round((etaTime - now) / 60000)); // Beräkna minuter kvar

        setTimeLeft(diffInMinutes);

        if (diffInMinutes <= 0) clearInterval(interval); // Stoppa nedräkning vid 0 min kvar
      }, 1000); // Uppdatera varje sekund

      return () => clearInterval(interval);
    }
  }, [eta]);

  useEffect(() => {
    const getReceipt = async () => {
      if (orderNumber) {
        const data = await fetchReceipt(orderNumber); 
        console.log("Fetched receipt data:", data); // 🔹 Logga svaret
        setReceiptData(data); 
      }
    }

    getReceipt();
  }, [orderNumber]);

  return (
    <div className={styles.confirmationContainer}>
      <h2>Orderbekräftelse</h2>
      <p>Dina wontons tillagas!</p>
      <p>Ordernummer: {orderNumber}</p>

      {/* 🔹 Uppdaterad ETA-visning */}
      {timeLeft !== null ? (
        <p>Beräknad leveranstid: {timeLeft} min kvar</p>
      ) : (
        <p>Leveranstid ej tillgänglig</p>
      )}

      {receiptData && (
        <div>
          <h3>Kvittodata</h3>
          <p>Order ID: {receiptData.id}</p>
          <p>Total: {receiptData.total} SEK</p>
        </div>
      )}
<button onClick={() => navigate('/')}>Gör en ny beställning</button>
    </div>
  );
}
export default OrderConfirmed;