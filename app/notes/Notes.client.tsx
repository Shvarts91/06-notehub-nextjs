"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import NoteModal from "@/components/NoteModal/NoteModal";
import { useDebounce } from "use-debounce";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

function Notes({
  initialSearch = "",
  initialPage = 1,
}: {
  initialSearch?: string;
  initialPage?: number;
}) {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, isError, isPending } = useQuery({
    queryKey: ["noteList", debouncedSearchQuery, currentPage],
    queryFn: () => fetchNotes(currentPage, debouncedSearchQuery),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData:
      debouncedSearchQuery === "" && currentPage === 1 ? undefined : undefined,
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateSearchQuery = (text: string) => {
    setCurrentPage(1);
    setSearchQuery(text);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchQuery={searchQuery} onChange={updateSearchQuery} />
        {data?.totalPages && (
          <Pagination
            onPageChange={onPageChange}
            totalPages={data.totalPages}
            currentPage={currentPage}
          />
        )}

        <button onClick={() => setIsOpenModal(true)} className={css.button}>
          Create note +
        </button>
      </header>
      {isOpenModal && <NoteModal closeModal={closeModal} />}
      {isPending && <Loader />}
      {data?.notes && <NoteList list={data.notes} />}
      {isError && <ErrorMessage />}
    </div>
  );
}

export default Notes;
