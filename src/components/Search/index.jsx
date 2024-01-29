import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { searchInput, searchClean } from "../../redux/searchSlice";
import styles from "./Search.module.scss";
import searchImg from "./search.png";
import { useRef, useCallback, useState } from "react";

function Search() {
  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  // ?Мысль в том, чтобы хранить\ изменять в стейте input.value, а уже после задержки debounce отправить в redux, откуда будут данные забираться для axios запроса 
  const [inputSearchValue, setInputSearchValue] = useState('')

  // ?Делается для того, чтобы после перерисовки снова не создавать ссылку, а ссылаться на прошлую.
  const inputRef = useRef(null);

  const handleClickCross = () => {
    dispatch(searchClean());
    setInputSearchValue('')

    // ?Вот тут фокусируемся на инпут после нажатия на крестик
    inputRef.current.focus();
  };


  //?CallBack возвращает функцию не пересоздая её при ререндере, получется, что всегда оращаемся к одной и той же функции
  const updateSearchValue = useCallback(
    debounce((inputSearchValue) => {
      dispatch(searchInput(inputSearchValue))
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    setInputSearchValue(event.target.value)
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={styles.search}
        // onChange={(event) => setSearch(event.target.value)}
        onChange={onChangeInput}
        // value={search}
        value={inputSearchValue}
        type="text"
        placeholder="Поиск пиццы..."
      />
      <img className={styles.img} src={searchImg} alt="search" />
      {inputSearchValue && (
        <svg
          onClick={handleClickCross}
          className={styles.cross}
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export default Search;
