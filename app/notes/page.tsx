// import {
//   QueryClient,
//   HydrationBoundary,
//   dehydrate,
// } from "@tanstack/react-query";
// import Notes from "./Notes.client";
// import { fetchNotes } from "@/lib/api";
// import { NotesResponse } from "@/types/note";

// interface PageProps {
//   searchParams: { search?: string; page?: string };
// }

// export default async function NotesPage({ searchParams }: PageProps) {
//   const queryClient = new QueryClient();

//   const params = await searchParams;

//   const search = params.search || "";
//   const page = parseInt(params.page || "1");

//   await queryClient.prefetchQuery({
//     queryKey: ["noteList", search, page],
//     queryFn: () => fetchNotes(page, search),
//   });

// const initialData = queryClient.getQueryData<NotesResponse>([
//   "noteList",
//   search,
//   page,
// ]);

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Notes
//         initialData={initialData}
//         initialSearch={search}
//         initialPage={page}
//       />
//     </HydrationBoundary>
//   );
// }

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { HydrationBoundary } from "@tanstack/react-query";
import { use } from "react";
import Notes from "./Notes.client";
import { NotesResponse } from "@/types/note";
interface PageProps {
  searchParams: { search?: string; page?: string };
}
export default function NotesPage({ searchParams }: PageProps) {
  const queryClient = new QueryClient();
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1");
  use(
    queryClient.prefetchQuery({
      queryKey: ["notelist", search, page],
      queryFn: () => fetchNotes(page, search),
    })
  );

  const initialData = queryClient.getQueryData<NotesResponse>([
    "noteList",
    search,
    page,
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Notes
        initialData={initialData}
        initialSearch={search}
        initialPage={page}
      />
    </HydrationBoundary>
  );
}
