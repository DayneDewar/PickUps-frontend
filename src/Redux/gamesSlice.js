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
        },
        updateGamePlayers: (state, action) => {
            return state.map(game => {
                if (game.id === parseInt(action.payload[0].id)) {
                    game.users.map(user => {
                        if (user.id === action.payload[1].id) {
                            return action.payload[1]
                        } else {
                            return user
                        }
                    })
                    return game
                } else {
                    return game
                }
            })
        }
    }
})

const overrideGames = gamesSlice.actions.overrideGames
const addGame = gamesSlice.actions.addGame
const removeGame = gamesSlice.actions.removeGame
const updateGamePlayers = gamesSlice.actions.updateGamePlayers
export { overrideGames, addGame, removeGame, updateGamePlayers }
export default gamesSlice.reducer