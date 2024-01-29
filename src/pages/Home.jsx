import axios from "axios";
// import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import Categories from "../components/Categories";
import { Sort, selectItems } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import Skeleton from "../components/PizzaBlock/skeleton";
import PizzaError from "../components/PizzaError";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import qs from "qs";
import { selectCategoryId, selectCurrentPage, selectSort, setFilters } from "../redux/categorySlice";
import { fetchPizzas } from "../redux/pizzaSlice";
import NotFound from "../assets/img/NotFound.gif";
// import { SearchContext } from "../App";

function Home() {
  // ?Переменные из стейта Redux
  // const {search} = useContext(SearchContext);
  const search = useSelector((state) => state.search.value);

  // const [activeCategory, setActiveCategory] = useState(0);
  const activeCategory = useSelector(selectCategoryId);

  // const [isSelect, setIsSelect] = useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });
  const isSelect = useSelector(selectSort);

  // const [line, setLine] = useState(false);
  const line = useSelector((state) => state.category.line);

  // const [pizzaData, pizzaSetData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const currentPage = useSelector(selectCurrentPage);
  // const [currentPage, setCurrentPage] = useState(1);

  const categoryBy = activeCategory === 0 ? "" : `?category=${activeCategory}`;
  const sortBy =
    activeCategory === 0
      ? `?sortBy=${isSelect.sortProperty}`
      : `&sortBy=${isSelect.sortProperty}`;
  const lineBy = line ? "asc" : "desc";

  const { items, status } = useSelector((state) => state.pizza);
  // !Сортировка через JS, для малого объема данных // !Вариант запроса к бэку через fetch (развернуть) //
  // const searchFilter = pizzaData.filter((file) => file.title.toLowerCase().includes(search.toLowerCase()));

  // useEffect(() => {
  //   (async function getPizzaData() {
  //     setIsLoading(true);
  //     try {
  //       const resp = await fetch(
  //         `https://656ee0506529ec1c6236d4b2.mockapi.io/items${categoryBy}${sortBy}&order=${lineBy}&search=${search}`
  //       );

  //       if (!resp.ok) {
  //         throw new Error(resp.error);
  //       }

  //       const data = await resp.json();
  //       pizzaSetData(data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  //   window.scrollTo(0, 0);
  // }, [activeCategory, categoryBy, isSelect, lineBy, sortBy, search]);

  // const fetchPizzas = () => {
  //   // !Вариант запроса к бэку через axiosconsole.log()
  //   setIsLoading(true);
  //   axios
  //     .get(
  //       `https://656ee0506529ec1c6236d4b2.mockapi.io/items${categoryBy}${sortBy}&order=${lineBy}&search=${search}&page=${currentPage}&limit=4`
  //     )
  //     .then((resp) => {
  //       pizzaSetData(resp.data);
  //       setIsLoading(false);
  //     });
  //   window.scrollTo(0, 0);
  // };

  const getPizzas = async () => {
    // setIsLoading(true);
    dispatch(
      fetchPizzas({
        categoryBy,
        sortBy,
        lineBy,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  // !Только при первом рендере смотрим пустая ли адресная строка
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList = selectItems.find(
        (obj) => obj.sortProperty === params.sortBy
      );

      dispatch(
        setFilters({
          ...params,
          sortList,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // !Если строка пустая то делаем запрос на сервер
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryBy, sortBy, lineBy, search, currentPage]);

  // !Если был самй первый рендер, то ничего не делаем и не меняем кроме стейта где говорим, что первый рендер прошёл
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryBy: activeCategory,
        sortBy: isSelect.sortProperty,
        lineBy: line,
        currentPage,
      });

      navigator(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryBy, sortBy, lineBy, search, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? 
        <PizzaError NotFound={NotFound}/>
      : 
        <div className="content__items">
          {status === "loading"
            ? [...new Array(3)].map((_, i) => <Skeleton key={i} />)
            : // ? вставка searchFilter вместо PizzaData
              items[0].map((item, i) => (
                <PizzaBlock
                  //! Можно прокинуть напрямую объект через spread
                  // {...item}
                  //
                  id={item.id}
                  key={i}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  sizes={item.sizes}
                  types={item.types}
                />
              ))}
        </div>
      }

      <Pagination />
    </>
  );
}

export default Home;
