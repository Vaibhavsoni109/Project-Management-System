import { apiSlice } from "./apiSlice"

const USER_URL = "/user"
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include",
            })
        }),

        getTeamList: builder.query({
            query: (data) => ({
                url: `${USER_URL}/get-team`,
                method: "GET",
                credentials: "include",
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            })
        }),

        UserAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            })
        }),


    })
})


export const {
    useUpdateUserMutation,
    useGetTeamListQuery,
    useDeleteUserMutation,
    useUserActionMutation
} = userApiSlice