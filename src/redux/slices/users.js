import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser } = userState.actions

export default userState.reducer