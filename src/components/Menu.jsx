import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../store/menuSlice';
import { fetchApiKey, fetchMenu } from '../services/api'; // Rätt sökväg för att importera createOrder


function Menu() {
  const dispatch = useDispatch();
  const menuItems = useSelector(state => state.menu.items);

  useEffect(() => {
    const getMenu = async () => {
      const apiKey = await fetchApiKey(); // Hämta API-nyckeln
      const menuData = await fetchMenu(apiKey); // Hämta menyn med nyckeln
      dispatch(setMenu(menuData)); // Sätta menyn i Redux store
    };

    getMenu();
  }, [dispatch]);

  return (
    <div>
      <h2>Menyn</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>{item.name} - {item.price} SEK</li>
        ))}
      </ul>
      <Link to="/checkout">Gå till Checkout</Link>
    </div>
  );
}

export default Menu;