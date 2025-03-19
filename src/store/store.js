import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import menuReducer from './menuSlice';

//Vi ställer in Redux store och kombinerar cartReducer och menuReducer som vi kommer att skapa i kommande steg.

export const store = configureStore({
  reducer: {
    cart: cartReducer,  // Lägger till cartSlice reducer till store
    menu: menuReducer,
  },
});

export default store;