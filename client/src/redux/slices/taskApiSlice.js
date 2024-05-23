import { apiSlice } from "./apiSlice"

const TASK_URL="/task"

export const taskApiSlice=apiSlice.injectEndpoints({
endpoints:(builder)=>({
    getDashboardStats:builder.query({
        query:(data)=>({
            url:`${TASK_URL}/dashboard`,
            method:"GET",
            body:data,
            credentials:"include",
        }),
    }),


}),
});
export const {useGetDashboardStatsQuery}=taskApiSlice