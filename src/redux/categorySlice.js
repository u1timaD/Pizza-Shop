import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    // ?Начальные состояния типа State

    categoryId: 0,
    line: false,
    currentPage: 1,
    sort: { name: "популярности", sortProperty: "rating" },
  },
  reducers: {
    setActiveCategory: (state, actions) => {
      // ?Меняем значение в InitialState (условно как setState)
			state.categoryId = actions.payload
    },
    setIsSelect: (state, actions) => {
      state.sort = actions.payload;
    },
    setLine: (state) => {
      state.line = !state.line;
    },
    setCurrentPage: (state, actions) => {
      state.currentPage = actions.payload;
    }, 
    setFilters: (state, actions) => {
      state.categoryId = Number(actions.payload.categoryBy);
      state.line = Boolean(actions.payload.lineBy);
      state.currentPage = Number(actions.payload.currentPage);
      state.sort = actions.payload.sortList;
  
    }
  },
})

//+Вынесли повторяющиеся куски селектов в отдельные функции
export const selectSort = (state) => state.category.sort;
export const selectCategoryId = (state) => state.category.categoryId;
export const selectCurrentPage = (state) => state.category.currentPage;

export const { setActiveCategory, setIsSelect, setLine, setCurrentPage, setFilters } = categorySlice.actions

export default categorySlice.reducer