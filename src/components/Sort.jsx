import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSort, setIsSelect, setLine } from "../redux/categorySlice";

const selectItems = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  const isSelect = useSelector(selectSort);
  const dispatch = useDispatch();

  const isClosePopup = (index) => {
    dispatch(setIsSelect(index));
    setIsOpen(false);
    dispatch(setLine());
  };

  const sortRef = useRef();

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (!evt.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
        // console.log("Повесили обработчик");
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      // console.log("Убрали обработчик");
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{isSelect.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {selectItems.map((selectItem, selectId) => (
              <li
                key={selectId}
                className={
                  isSelect.sortProperty === selectItem.sortProperty
                    ? "active"
                    : ""
                }
                onClick={() => isClosePopup(selectItem)}
              >
                {selectItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export { selectItems, Sort };
