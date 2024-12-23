import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userId: number | null;
    email: string | null;
    nom: string | null;
    prenom: string | null;
    role: string | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    userId: null,
    email: null,
    role: null,
    nom: null,
    prenom: null,
    token: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.nom = action.payload.nom;
            state.prenom = action.payload.prenom;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userId = null;
            state.email = null;
            state.role = null;
            state.nom = null;
            state.prenom = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logout } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
