import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { credentials } from "@/types/credentials";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    Login: builder.mutation<{ token: string }, credentials>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
