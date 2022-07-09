import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Project, ReportFetchDTO, Transaction, ApiResultDataWrapper, Gateway } from '../common/interfaces'

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://178.63.13.157:8090/mock-api/api/' }),
  endpoints: (builder) => ({
    getProjectList: builder.query<Array<Project>, void>({
      query: () => 'projects',
      transformResponse: (response : ApiResultDataWrapper<Array<Project>>) => response.data,
    }),
    getGatewayList: builder.query<Array<Gateway>, void>({
      query: () => 'gateways',
      transformResponse: (response : ApiResultDataWrapper<Array<Gateway>>) => response.data,
    }),
    getReport: builder.mutation<Array<Transaction>, ReportFetchDTO>({
      query: (reportFetchDTO) => ({
        url: 'report',
        method: 'POST',
        body: reportFetchDTO,
      }),
      transformResponse: (response : any) => response.data,

    })
  })
})

export const { useGetProjectListQuery, useGetReportMutation, useGetGatewayListQuery } = dashboardApi
