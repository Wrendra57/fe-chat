// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const usersApi = createApi({
//   reducerPath: "usersApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8090/",
//   }),
//   tagTypes: ["Users"],
//   endpoints: (build) => ({
//     listUsers: build.mutation({
//       query: ({ token, page }) => ({
//         url: `api/users`,
//         method: "GET",
//         params: {
//           page: page,
//         },
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }),
//       invalidatesTags: ["Users"],
//     }),
//     oneUser: build.mutation({
//       query: ({ token, id }) => ({
//         url: `api/user/detail/${id}`,
//         method: "GET",
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }),
//       invalidatesTags: ["Users"],
//     }),
//     currentUser: build.mutation({
//       query: (token) => ({
//         url: `api/user/detail`,
//         method: "GET",
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }),
//       invalidatesTags: ["Users"],
//     }),
//     delete: build.mutation({
//       query: ({ token, id }) => ({
//         url: `api/user/delete/${id}`,
//         method: "DELETE",
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }),
//       invalidatesTags: ["Users"],
//     }),
//     editUser: build.mutation({
//       query: ({ token, body }) => ({
//         url: `/api/profile/edit`,
//         method: "PUT",
//         body: body,
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }),
//       invalidatesTags: ["Users"],
//     }),
//     createUser: build.mutation({
//       query: ({ token, body }) => ({
//         url: `/api/user/create`,
//         method: "POST",
//         body: body,
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }),
//       invalidatesTags: ["Users"],
//     }),
//   }),
// });

// export const {
//   useListUsersMutation,
//   useOneUserMutation,
//   useCurrentUserMutation,
//   useDeleteMutation,
//   useEditUserMutation,
//   useCreateUserMutation,
// } = usersApi;

// export default usersApi;
