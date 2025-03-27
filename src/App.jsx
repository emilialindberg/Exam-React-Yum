import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmed from './components/OrderConfirmed';
import Header from './components/Header';
import './styles/global.scss'; // Importera en global CSS

// Body Styling Handler
const BodyStyler = () => {
  const location = useLocation();

  useEffect(() => {
    // Ta bort alla befintliga klasser
    document.body.classList.remove('menu-page', 'cart-page', 'checkout-page', 'order-confirmed-page');

    // Lägg till klassen baserat på den aktuella vägen
    if (location.pathname === '/') {
      document.body.classList.add('menu-page');
    } else if (location.pathname === '/cart') {
      document.body.classList.add('cart-page');
    } else if (location.pathname === '/checkout') {
      document.body.classList.add('checkout-page');
    } else if (location.pathname === '/order-confirmed') {
      document.body.classList.add('order-confirmed-page');
    }
  }, [location]);

  return null; // Ingen rendering krävs
};

function App() {
  const location = useLocation(); // Använd useLocation för att spåra sidans sökväg

  return (
    <div>
      {/* Rendera headern endast om vi är på meny-sidan */}
      {location.pathname === '/' && <Header />}
      <BodyStyler /> {/* Lägger till BodyStyler för att styla body */}
      <Routes>
        <Route path="/" element={<Menu />} />                {/* Startsidan */}
        <Route path="/cart" element={<Cart />} />            {/* Varukorgssidan */}
        <Route path="/checkout" element={<Checkout />} />    {/* Checkout-sidan */}
        <Route path="/order-confirmed" element={<OrderConfirmed />} /> {/* Orderbekräftelse */}
      </Routes>
    </div>
  );
}

// Huvudkomponenten är anropad under Router som Wrap
export default function RouterWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}