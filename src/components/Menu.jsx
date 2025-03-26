import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../store/menuSlice';
import { fetchApiKey, fetchMenu } from '../services/api';
import { Link } from 'react-router-dom';
import { addItem } from '../store/cartSlice';
import styles from '../styles/Menu.module.scss';

function Menu() {
  const dispatch = useDispatch();
  const menuItems = useSelector(state => state.menu.items);

  useEffect(() => {
    const getMenu = async () => {
      const apiKey = await fetchApiKey();
      const menuData = await fetchMenu(apiKey);

      if (menuData) {
        dispatch(setMenu(menuData.items));
      } else {
        console.error('Ingen data ficks för menyn!');
      }
    };

    getMenu();
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  const dips = menuItems.filter(item => item.type === 'dip');
  const nonDipsItems = menuItems.filter(item => item.type !== 'dip');

  return (
    <div className={styles.menuContainer}>
      {menuItems.length === 0 ? (
        <p>Inga varor tillgängliga just nu.</p>
      ) : (
        <div>
          <div className={styles.menuTitleBox}>
            <h2 className={styles.menuTitle}>Meny</h2>
          </div>

          {/* Render non-dips items */}
          {nonDipsItems.map(item => (
            <div className={styles.menuItemBox} key={item.id} onClick={() => handleAddToCart(item)}>
              <div className={styles.itemTopRow}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemPrice}>{item.price} SEK</div>
              </div>
              <div className={styles.itemDescription}>
                {Array.isArray(item.ingredients) ? item.ingredients.join(', ') : 'Inga ingredienser tillgängliga'}
              </div>
            </div>
          ))}

          {/* Dipsåser box */}
          {dips.length > 0 && (
            <div className={styles.dipsBoxContainer}>
              <div className={styles.itemTopRow}>
                <div className={styles.itemName}>Dipsås</div>
              </div>
              <div className={styles.itemDescription}>
                {dips.map(dip => (
                  <div 
                    key={dip.id} 
                    className={styles.dipBox} 
                    onClick={() => handleAddToCart(dip)} 
                  >
                    {dip.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <Link to="/checkout" className={styles.checkoutLink}>
        Gå till Checkout
      </Link>
    </div>
  );
}

export default Menu;