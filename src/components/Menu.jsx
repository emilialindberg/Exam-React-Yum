import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../store/menuSlice';
import { fetchApiKey, fetchMenu } from '../services/api';
import { Link } from 'react-router-dom';
import { addItem } from '../store/cartSlice'; // Importera addItem
import styles from '../styles/Menu.module.scss';

function Menu() {
  const dispatch = useDispatch();
  const menuItems = useSelector(state => state.menu.items); // Hämta menyn från Redux

  const apiKey = "yum-BAPUdN5hTPLuk3iN"; // Använd den API-nyckeln

  useEffect(() => {
      const getMenu = async () => {
        const menuData = await fetchMenu(apiKey); // Hämta menyn
        if (menuData) {
          console.log('Menu data fetched:', menuData); // Logga menydatan
          dispatch(setMenu(menuData.items)); // Sätta menyn i Redux med items
        } else {
          console.error('Ingen data ficks för menyn!'); // Logga om ingen data
        }
      };
  
      getMenu(); // Anropa funktionen
  }, [dispatch]);


  // Funktion för att lägga till ett objekt i varukorgen
  const handleAddToCart = (item) => {
    dispatch(addItem(item)); // Lägger till varan i varukorgen
  };

  return (
    <div className={styles.menuContainer}>
      <h2>Menyn</h2>
      {menuItems.length === 0 ? (
        <p>Inga varor tillgängliga just nu.</p> // Meddelande om tom meny
      ) : (
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              {item.name} - {item.price} SEK
              <button onClick={() => handleAddToCart(item)}>Lägg till</button> {/* Knapp för att lägga till varan */}
            </li>
          ))}
        </ul>
      )}
      <Link to="/checkout" className={styles.checkoutLink}>
        Gå till Checkout
      </Link>
    </div>
  );
}

export default Menu;