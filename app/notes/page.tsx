// import {
//   QueryClient,
//   HydrationBoundary,
//   dehydrate,
// } from "@tanstack/react-query";
// import Notes from "./Notes.client";
// import { fetchNotes } from "@/lib/api";
// import { NotesResponse } from "@/types/note";

// interface PageProps {
//   searchParams: Promise<{ search?: string; page?: string }>;
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

import { fetchNotes } from "@/lib/api";

import Notes from "./Notes.client";

export default async function NotesPage() {
  const initialData = await fetchNotes();

  return <Notes initialData={initialData} />;
}
