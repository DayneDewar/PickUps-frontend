import { createSlice } from '@reduxjs/toolkit';

export const gamesSlice = createSlice({
    name: 'games',
    initialState: [],
    reducers: {
        overrideGames: (state, action) => {
            return [...action.payload]
        },
        addGame: (state, action) => {
            state.push(action.payload)
        },
        removeGame: (state, action) => {
            return state.filter(game => game !== action.payload)
        }
    }
})

const overrideGames = gamesSlice.actions.overrideGames
const addGame = gamesSlice.actions.addGame
const removeGame = gamesSlice.actions.removeGame
export { overrideGames, addGame, removeGame }
export default gamesSlice.reducer