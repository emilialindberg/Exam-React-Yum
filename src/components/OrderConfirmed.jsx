import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchReceipt } from '../services/api'; // Importera funktionen för att hämta kvittot

//Denna komponent hämtar ordernumret från location.state och anropar fetchReceipt-funktionen för att hämta kvittot.
//Om kvittot är tillgängligt visas det i komponenten.
//Du kan anpassa vad som visas i kvittot beroende på strukturen av kvittodata från API.

function OrderConfirmed() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber; // Hämta ordernummer från state
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const getReceipt = async () => {
      if (orderNumber) {
        const data = await fetchReceipt(orderNumber); // Hämta kvittot via API
        setReceiptData(data); // Sätta kvittodata
      }
    };

    getReceipt();
  }, [orderNumber]);

  return (
    <div>
      <h2>Orderbekräftelse</h2>
      <p>Dina wontons tillagas!</p>
      <p>Ordernummer: {orderNumber}</p>
      {receiptData && (
        <div>
          <h3>Kvittodata</h3>
          <p>Order ID: {receiptData.id}</p>
          <p>Total: {receiptData.total} SEK</p>
          {/* Visa mer kvittodata om tillgängligt */}
        </div>
      )}
      <button onClick={() => navigate('/menu')}>Gör en ny beställning</button>

    </div>
  );
}

//Nu har vi implementerat logiken för att hämta och visa kvittodata 
// baserat på ordernumret, samt lagt in navigeringsknappar för att gå tillbaka till menyn.
export default OrderConfirmed;