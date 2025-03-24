import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../store/cartSlice'; // Importera removeItem om du vill kunna ta bort varor

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items); // Hämta varor från varukorgens tillstånd

  const handleRemoveItem = (itemId) => {
    // Funktion för att ta bort en vara från varukorgen
    dispatch(removeItem({ id: itemId }));
  };

  return (
    <div>
      <h2>Din Varukorg</h2>
      {cartItems.length === 0 ? ( // Kontrollera om varukorgen är tom
        <p>Du har inga varor i din varukorg.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} - {item.price} SEK
              <button onClick={() => handleRemoveItem(item.id)}>Ta bort</button> {/* Knappar för att ta bort varor */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;