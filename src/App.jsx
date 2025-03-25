import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmed from './components/OrderConfirmed';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />                {/* Startsidan */}
        <Route path="/cart" element={<Cart />} />            {/* Varukorgssidan */}
        <Route path="/checkout" element={<Checkout />} />    {/* Checkout-sidan */}
        <Route path="/order-confirmed" element={<OrderConfirmed />} /> {/* Orderbekräftelse */}
      </Routes>
    </Router>
  );
}

export default App;