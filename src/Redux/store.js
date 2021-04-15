import { configureStore } from '@reduxjs/toolkit';
import sportsReducer from './sportsSlice';
import gamesReducer from './gamesSlice';

const store = configureStore({
    reducer: {
        sports: sportsReducer,
        games: gamesReducer
    }
})

export default store