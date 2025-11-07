import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idUser: 2,
    currentUser: null,
    users: [
        {   
            idUser:1,
            username: 'iko',
            email: 'elfrnani.ikram@gmail.com',
            password: 'iko123',
        },
        {   
            idUser:2,
            username: 'mimo',
            email: 'mimo@gmail.com',
            password: 'm12',
        }
    ]
};

const UsersSlice = createSlice({
    name: "Users",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            const user = state.users.find(u => u.idUser === action.payload.idUser);
            if (user) {
                state.currentUser = user;
            }
        },
        logout: (state) => {
            state.currentUser = null;
        },
        Ajouter: (state, action) => {
            state.idUser++;
            state.users.push({
                idUser: state.idUser,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password
            });
        },
        Supprimer: (state, action) => {
            state.users = state.users.filter(user => user.idUser !== action.payload.idUser);
            if (state.currentUser.idUser === action.payload.idUser) {
                state.currentUser = null;
            }            
        },
        Modifier: (state, action) => {
            const userIndex = state.users.findIndex(user => user.idUser === action.payload.idUser);
            if (userIndex !== -1) {
                state.users[userIndex] = {
                    ...state.users[userIndex],
                    ...action.payload.updatedData
                };
                
                if (state.currentUser.idUser === action.payload.idUser) {
                    state.currentUser = state.users[userIndex];
                }                
                
            }
        }}
});

export default UsersSlice.reducer;
export const {login, logout, Ajouter, Supprimer, Modifier} = UsersSlice.actions;