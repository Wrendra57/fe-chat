import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Chat"],
  endpoints: (build) => ({
    getListRoom: build.mutation({
      query: ({ token }) => ({
        url: `api/v1/roomChats`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    createPersonalChat: build.mutation({
      query: ({ token, uuid }) => ({
        url: `api/v1/roomChatsPersonal/${uuid}`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    getHeaderChat: build.mutation({
      query: ({ token, roomId }) => ({
        url: `api/v1/headerChats/${roomId}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    getAllChat: build.mutation({
      query: ({ token, roomId }) => ({
        url: `api/v1/Chats/${roomId}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    sendChat: build.mutation({
      query: ({ token, body }) => ({
        url: `/api/v1/Chats`,
        method: "POST",
        body: body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
    createGroup: build.mutation({
      query: ({ token, body }) => ({
        url: `/api/v1/roomChatsGroup`,
        method: "POST",
        body: body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useSendChatMutation,
  useGetListRoomMutation,
  useCreatePersonalChatMutation,
  useGetAllChatMutation,
  useGetHeaderChatMutation,
  useCreateGroupMutation,
} = chatApi;

export default chatApi;

// const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9091/" }),
//   tagTypes: ["Auth"],
//   endpoints: (build) => ({
//     register: build.mutation({
//       query: ({ body, role }) => ({
//         url: `api/register/${role}`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     resendOtp: build.mutation({
//       query: (body) => ({
//         url: `api/register/send-otp`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     login: build.mutation({
//       query: ({ body, role }) => ({
//         url: `api/login-${role}`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     forgotPassword: build.mutation({
//       query: (body) => ({
//         url: `api/forget-password/send`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     changePassword: build.mutation({
//       query: (body) => ({
//         url: `api/forget-password/change-password`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     logout: build.mutation({
//       query: (token) => ({
//         url: `api/logout`,
//         method: "GET",
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//         responseHandler: "text/html",
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//   }),
// });

// export const {
// 	useRegisterMutation,
// 	useResendOtpMutation,
// 	useLoginMutation,
// 	useForgotPasswordMutation,
// 	useChangePasswordMutation,
// 	useLogoutMutation
// } = authApi

// export default authApi
