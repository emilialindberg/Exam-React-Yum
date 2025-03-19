export const fetchReceipt = async (orderNumber) => {
    try {
      // Anta att tenant ID behövs i URL:en
      const tenantId = 'your-tenant-id'; // Byt ut med korrekt tenant ID
      const response = await fetch(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts/${orderNumber}`, {
        method: 'GET',
        headers: { "x-zocom": '<api-key-here>' }, // Byt ut med din API-nyckel
      });
      const data = await response.json();
      return data; // Returnera kvittodata
    } catch (error) {
      console.error('Error fetching receipt:', error);
    }
  };



export const fetchApiKey = async () => {
    try {
      const response = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'GET',
      });
      const data = await response.json();
      return data.apiKey; // Anta att nyckeln finns i data.apiKey
    } catch (error) {
      console.error('Error fetching API key:', error);
    }
  };
  
  export const fetchMenu = async (apiKey) => {
    try {
      let response = await fetch("https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu", {
        method: "GET",
        headers: { "x-zocom": apiKey },
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };