import { baseApi } from "@/redux/api/base.api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup/",
        method: "POST",
        body: userInfo,
      }),
    }),
    sendOTP: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/otp/send/",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/otp/verify/",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo)
        return {
        url: "/auth/login/",
        method: "POST",
        body: userInfo,
      }},
    }),
    // logout: builder.mutation({
    //   query: () => ({
    //     url: "/logout",
    //     method: "POST",
    //   }),
    // }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSendOTPMutation, useVerifyOTPMutation } =
  authApi;
