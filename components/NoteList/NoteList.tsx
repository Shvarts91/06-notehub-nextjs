import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteList.module.css";
import { deleteNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import Link from "next/link";

interface NoteListProps {
  list: Note[];
}

const NoteList = ({ list }: NoteListProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNoteById,
    onSuccess: (data) => {
      console.log("Notate delete:", data);
      queryClient.invalidateQueries({ queryKey: ["noteList"] });
    },
    onError: (error) => {
      console.error("Error receiving note:", error);
    },
  });

  const deleteNoteClickButton = (id: number) => {
    mutation.mutate(id);
  };
  return (
    <ul className={css.list}>
      {list.map((note) => {
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}> View details</Link>
              <button
                onClick={() => deleteNoteClickButton(note.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
