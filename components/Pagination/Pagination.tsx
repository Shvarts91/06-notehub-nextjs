import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  onPageChange: (number: number) => void;
  currentPage: number;
}

const Pagination = ({
  totalPages,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  const handleChangePage = ({ selected }: { selected: number }) =>
    onPageChange(selected + 1);
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handleChangePage}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
