import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import { TimeTableSamples } from '../../../Samples'

export interface TimeTableProperties {
    key?: string | '',
    subject?: string | '',
    startTime?: string | '',
    endTime?: string | '',
    day?: string | ''
}

interface IContext<TProperties>{
  key: number,
  list: TProperties[],
  filters: TProperties[],
  timeTable: TProperties,
  day: string
}

const initialState: IContext<TimeTableProperties> = {  
  key: 1,
  list: [],
  filters: [],
  timeTable: {},
  day: 'Monday'
}

export const timeTableSlice = createSlice({
    name: 'timetable',
    initialState,
    reducers: {
        addTimeTable: (state, action: PayloadAction<TimeTableProperties>) => {
          state.list.push(action.payload)
        },
        getSamples: (state) => {
          state.list = TimeTableSamples
          state.key = state.list.length+1
        },
        getCerainTable: (state, action: PayloadAction<string>) => {
          state.filters = state.list.filter(timeTable => timeTable.day === action.payload)
          state.filters.sort((a,b) => Date.parse('2022/04/17 ' + a.startTime?.slice(0,-2) + ' ' + a.startTime?.slice(-2)) - 
                              Date.parse('2022/04/17 ' + b.startTime?.slice(0,-2) + ' ' + b.startTime?.slice(-2)))
        },
        deleteCertainTable: (state, action: PayloadAction<string>) => {
          state.list = state.list.filter(timeTable => timeTable.key !== action.payload)
          state.filters = state.list.filter(timeTable => timeTable.day === state.day)
        },
        getSelectedTable: (state, action: PayloadAction<string>) => {          
          state.timeTable = <TimeTableProperties>(state.filters.find(timeTable => timeTable.key === action.payload))          
        },
        updateTimeTable: (state, action: PayloadAction<TimeTableProperties>) => {          
          const index: number = state.list.findIndex(timeTable => timeTable.key === action.payload.key)
          state.list[index] = action.payload
        },
        updateKey: (state) => {
          state.key++
        },
        setDay: (state, action: PayloadAction<string>) => {
          state.day = action.payload
        },
    }
})

export const { addTimeTable, 
               getSamples, 
               getCerainTable, 
               updateKey,
               deleteCertainTable,
               getSelectedTable,
               updateTimeTable,
               setDay } = timeTableSlice.actions

export default timeTableSlice.reducer