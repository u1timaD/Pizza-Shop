import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryId, setActiveCategory } from "../redux/categorySlice";
// import { useState } from "react";

function Categories() {
  const pizzaCategory = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  //?Вытягивает стейт из стора редакса
  const activeCategory = useSelector(selectCategoryId)
  //?Установка стейта в редакс
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {pizzaCategory.map((type, index) => (
          <li
            key={index}
            onClick={
              // () => {setActiveCategory(index)}
              () => dispatch(setActiveCategory(index))
            }
            className={activeCategory === index ? "active" : ""}
          >
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
