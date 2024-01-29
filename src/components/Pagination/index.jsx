import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentPage, setCurrentPage } from "../../redux/categorySlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
	return (
		<ReactPaginate
        className={styles.root}
        breakLabel="..."
        previousLabel="<"
        onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        nextLabel=">"
        renderOnZeroPageCount={null}
      />
	)
}

export default Pagination;