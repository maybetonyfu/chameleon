import { createSlice } from '@reduxjs/toolkit'

const initialState = { text: 0 }

const { actions, reducer } = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setText(state, payload) {
            return { ...state, text: payload.text }
        },
    },
})

export const { setText } = actions
export default reducer