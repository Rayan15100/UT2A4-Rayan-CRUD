// Importamos las herramientas de Redux
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Creamos el slice para manejar la sesión del usuario
const authSlice = createSlice({
  name: 'authentication',
  initialState: { isAutenticated: false, userName: '', userRol: '' },
  reducers: {
    // Cuando hacemos login, guardamos el nombre y el rol para usarlos luego
    login(state, action) {
      state.isAutenticated = true;
      state.userName = action.payload.name;
      state.userRol = action.payload.rol;
    },
    // Al cerrar sesión, limpiamos todo y lo dejamos como al principio
    logout(state) {
      state.isAutenticated = false;
      state.userName = '';
      state.userRol = '';
    }
  }
});

export const authActions = authSlice.actions;
const store = configureStore({ reducer: { authenticator: authSlice.reducer } });

export type RootState = ReturnType<typeof store.getState>;
export default store;