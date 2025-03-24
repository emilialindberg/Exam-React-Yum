import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchReceipt } from '../services/api'; 
import styles from '../styles/OrderConfirmed.module.scss'; // Importera stilar


function OrderConfirmed() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber; 
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const getReceipt = async () => {
      if (orderNumber) {
        const data = await fetchReceipt(orderNumber); 
        setReceiptData(data); 
      }
    };

    getReceipt();
  }, [orderNumber]);

  return (
    <div className={styles.confirmationContainer}> {/* Använd className här */}
      <h2>Orderbekräftelse</h2>
      <p>Dina wontons tillagas!</p>
      <p>Ordernummer: {orderNumber}</p>
      {receiptData && (
        <div>
          <h3>Kvittodata</h3>
          <p>Order ID: {receiptData.id}</p>
          <p>Total: {receiptData.total} SEK</p>
        </div>
      )}
      <button onClick={() => navigate('/menu')}>Gör en ny beställning</button>
    </div>
  );
}

export default OrderConfirmed;