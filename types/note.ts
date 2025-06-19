type NoteTag = "Work" | "Personal" | "Shopping" | "Meeting" | "Todo";

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteType {
  title: string;
  content?: string;
  tag: "" | NoteTag;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
