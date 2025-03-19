import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderConfirmed from './components/OrderConfirmed';
import Header from './components/Header';
import Checkout from './components/Checkout'; // Importera Checkout

<Route path="/checkout" element={<Checkout />} />

function App() {
  return (
    <Router> {/*Definiera rutter & dess komponenter*/}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
      </Routes>
    </Router>
  );
}

export default App;