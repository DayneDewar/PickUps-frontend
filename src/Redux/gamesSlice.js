import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer'

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
            const gameId = parseInt(action.payload.id)
            return  state.filter(game => game.id !== gameId)
        },
        addGamePlayers: (state, action) => {
            console.log(action.payload)
            const gameId = parseInt(action.payload[0].id)
            return state.map((gameObj) => {
                console.log(gameObj)
                if (gameObj.id !== gameId) {
                    return gameObj
                }
                else return (
                    produce(gameObj, draftState => {
                        draftState.users.push(action.payload[1])
                    })
                )
            })
        },
        updateGamePlayers: (state, action) => {
            console.log(action.payload)
            const gameId = parseInt(action.payload[0].id)
            const userId = parseInt(action.payload[1].id)
            const newLike = {likes: action.payload[1].likes}
            return state.map((game) => {
                if (game.id === gameId) {
                    return produce(game, draftState => {
                        console.log(draftState)
                        draftState.users.map(user => {
                            if (user.id === userId) {
                                return action.payload[1]
                            } else return console.log(user)
                        })
                    })
                } else return game
                
            })
        }
    }
})

const overrideGames = gamesSlice.actions.overrideGames
const addGame = gamesSlice.actions.addGame
const removeGame = gamesSlice.actions.removeGame
const addGamePlayers = gamesSlice.actions.addGamePlayers
const updateGamePlayers = gamesSlice.actions.updateGamePlayers
export { overrideGames, addGame, removeGame, updateGamePlayers, addGamePlayers }
export default gamesSlice.reducer