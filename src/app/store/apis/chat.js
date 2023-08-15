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
    // register: build.mutation({
    //   query: ({ body }) => ({
    //     url: `api/v1/users/register`,
    //     method: "POST",
    //     body: body,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // verification: build.mutation({
    //   query: ({ body, otp }) => ({
    //     url: `api/v1/users/otp/${otp}`,
    //     method: "POST",
    //     body: body,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // login: build.mutation({
    //   query: ({ body }) => ({
    //     url: `api/v1/users/login`,
    //     method: "POST",
    //     body: body,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // authentication: build.mutation({
    //   query: ({ token }) => ({
    //     url: `api/v1/users`,
    //     method: "GET",
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // searchUsers: build.mutation({
    //   query: ({ token, nameSearch }) => ({
    //     url: `api/v1/users/${nameSearch}`,
    //     method: "GET",
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // forgotPassword:
    // changePassword: build.mutation({
    //   query: (body) => ({
    //     url: `api/forget-password/change-password`,
    //     method: "POST",
    //     body: body,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
    // logout: build.mutation({
    //   query: (token) => ({
    //     url: `api/logout`,
    //     method: "GET",
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //     responseHandler: "text/html",
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
  }),
});

export const { useGetListRoomMutation } = chatApi;

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
