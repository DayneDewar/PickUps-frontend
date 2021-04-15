import { createSlice } from "@reduxjs/toolkit";

export const sportsSlice = createSlice({
    name: 'sports',
    initialState: [],
    reducers: {
        overrideSports: (state, action) => {
            return  [...action.payload]
        },
        addSport: (state, action) => {
            state.push(action.payload)
        },
        removeSport: (state, action) => {
            return state.filter(sport => sport !== action.payload)
        }
    }
})

const addSport = sportsSlice.actions.addSport
const removeSport = sportsSlice.actions.removeSport
const overrideSports = sportsSlice.actions.overrideSports
export { addSport, removeSport, overrideSports }
export default sportsSlice.reducer;