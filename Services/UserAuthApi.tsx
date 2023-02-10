import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserauthApi = createApi({
    reducerPath : 'UserauthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://rony2412.pythonanywhere.com/auth/' }),
    endpoints: (builder) => ({
      registerUser: builder.mutation({
        query: (user) => {
          return {
            url: 'registeruser',
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),
      loginUser: builder.mutation({
        query: (user) => {
          return {
            url: 'login',
            method: 'POST',
            body: user,
            headers: {
              'Content-type': 'application/json',
            }
          }
        }
      }),
      getUser: builder.query({
        query: (token) => {
          return {
            url: 'getuser',
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }
        }
      }),
    }),
})

export const {useRegisterUserMutation, useLoginUserMutation, useGetUserQuery} = UserauthApi