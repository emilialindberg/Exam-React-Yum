
// Funktion för att hämta API-nyckeln
export const fetchApiKey = async () => {
  try {
    const response = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys', {
      method: 'GET',
    });
    const data = await response.json();
    return data.apiKey; // Kontrollerar om 'apiKey' finns
  } catch (error) {
    console.error('Error fetching API key:', error);
  }
}; 

// Funktion för att hämta menyn
export const fetchMenu = async (apiKey) => {
  try {
    const response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {
      method: "GET",
      headers: { "x-zocom": apiKey }, // Använd den hämtade API-nyckeln
    });
    
    const data = await response.json();
    return data; // Returnerar menydatan
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
};

// Funktion för att skapa en order
export const createOrder = async (tenantId, orderData, apiKey) => {
  try {
    const response = await fetch(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders`, {
      method: 'POST',
      headers: {
        'x-zocom': apiKey, // API-nyckeln
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData), // Se till att datan skickas i rätt format
    });

    const data = await response.json(); // Hämta svaret
    console.log('Response from order creation:', data); // Logga
    return data; // Returnera orderdata
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

// Funktion för att hämta kvitton
export const fetchReceipt = async (orderNumber) => {
  try {
    const response = await fetch(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts/${orderNumber}`, {
      method: 'GET',
      headers: { "x-zocom": '<api-key-here>' }, // Byt ut med din API-nyckel
    });
    const data = await response.json();
    return data; // Returnerar kvittodata
  } catch (error) {
    console.error('Error fetching receipt:', error);
  }
};