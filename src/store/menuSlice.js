import { createSlice } from '@reduxjs/toolkit';

//definierar vi initialt tillstånd för menyn och en reducerare för att sätta menyn när vi hämtar data från API:et.



const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
  },
  reducers: {
    setMenu: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;