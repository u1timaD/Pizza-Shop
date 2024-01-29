import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // !находим в массиве items нужный объект по id
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      // !Проверяем, если мы его нашли, то прибавлем +1 к ключу count
      if (findItem) {
        findItem.count++;
      }
      // !Если же мы его не нашли (то есть он у нас первый раз), то пушим объект в массив и добавляем новый ключ count=1
      else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      // !Тут пробегаемся по каждобу объекту массива и умножаем цену на count и суммируем предыдущую цену
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },

    // !Удаляем пиццы из корзины определённые
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    // !Удаляем из общей суммы определнную сумму пицц
    removePrice: (state, action) => {
      state.totalPrice -= action.payload;
    },
    // !Очищаем всю корзину
    clearItem: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItem, removePrice, minusItem } =
  cartSlice.actions;
export default cartSlice.reducer;
