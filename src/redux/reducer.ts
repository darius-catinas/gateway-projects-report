import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Project } from '../common/interfaces'

export interface ReportState {
  projects: Array<Project>,
  selectedProjectId?: string
}

const initialState: ReportState = {
  projects: [],
  selectedProjectId: undefined
}

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    selectProject: (state: ReportState, action: PayloadAction<string | undefined>) => {
      state.selectedProjectId = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { selectProject } = reportSlice.actions

export default reportSlice.reducer
