import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    // ?Начальные состояния типа useState
    value: '',
  },
  reducers: {
    searchInput: (state, action) => {
      state.value = action.payload
    },
    searchClean: (state) => {
      state.value = ''
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchInput, searchClean, incrementByAmount } = searchSlice.actions

export default searchSlice.reducer
