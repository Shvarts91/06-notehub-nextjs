"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

const NoteDetailsClient = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{data.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
