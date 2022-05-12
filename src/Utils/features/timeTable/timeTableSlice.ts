import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import { TimeTableSamples } from '../../../Samples'

import { autoIncrement } from '../../Computations';

export interface Checks {
  id: string;
  status: boolean;
  task: string;
}

export interface TimeTableProperties<TCheck> {
    key?: string | '',
    subject?: string | '',
    startTime?: string | '',
    endTime?: string | '',
    day?: string | '',
    todolist: TCheck[] | []
    todolistPercentage?: string
}

export interface IContext<TProperties>{
  key: string,
  todolistKey: string,  
  list: TProperties[],
  filters: TProperties[],
  timeTable: TProperties,
  day: string
}

const initialState: IContext<TimeTableProperties<Checks>> = {  
  key: '1',
  todolistKey: '1',
  list: [],
  filters: [],
  timeTable: {
    todolist: []
  },
  day: 'Monday'
}

export const timeTableSlice = createSlice({
    name: 'timetable',
    initialState,
    reducers: {
        addTimeTable: (state, action: PayloadAction<TimeTableProperties<Checks>>) => {
          state.list.push(action.payload)
        },
        getSamples: (state) => {
          state.list = TimeTableSamples
          state.key = (state.list.length+1).toString()

          let count = 0;

          state.todolistKey = '1'
          state.list.map(item => {
            count += item.todolist?.length?? 0
          })
          // Update the number of Todolist Key
          state.todolistKey = count.toString()

          // Update New Todolist Key
          state.todolistKey = autoIncrement({key:state.todolistKey})
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
          state.timeTable = <TimeTableProperties<Checks>>(state.filters.find(timeTable => timeTable.key === action.payload))          
        },
        updateTimeTable: (state, action: PayloadAction<TimeTableProperties<Checks>>) => {          
          const index: number = state.list.findIndex(timeTable => timeTable.key === action.payload.key)
          state.list[index] = action.payload
        },
        updateKey: (state) => {
          state.key = autoIncrement({key:state.key})
        },
        setDay: (state, action: PayloadAction<string>) => {
          state.day = action.payload
        },
        addTodolist: (state, action: PayloadAction<string>) => {
          // Get the Timetable
          const {timeTable: curr} = state
          const {payload} = action

          const todolist:Checks = {
            id: state.todolistKey,
            status: false,
            task: payload
          }

          curr.todolist?.push(todolist)

          const index: number = state.list.findIndex(timeTable => timeTable.key === curr.key)
          state.list[index] = curr

          // Update TimeTable Todolist key
          state.todolistKey = autoIncrement({key:state.todolistKey})
        },
        updateTodolistStatus: (state, action: PayloadAction<string>) => {
          const {timeTable: curr} = state
          const {payload} = action
          
          const {todolist} = curr

          const todoListIdx: number = todolist?.findIndex(todlist => todlist.id === payload)
          
          if(todolist[todoListIdx]){
            todolist[todoListIdx].status = !todolist[todoListIdx].status
            curr.todolist[todoListIdx] = todolist[todoListIdx]

            const index: number = state.list.findIndex(timeTable => timeTable.key === curr.key)
            state.list[index] = curr
          }          
        },
        deleteTodolist: (state, action: PayloadAction<string>) => {
          const {timeTable: curr} = state
          const {payload} = action

          const {todolist} = curr 

          const list = todolist.filter(todlist => todlist.id !== payload)
          state.timeTable.todolist = list

          const index: number = state.list.findIndex(timeTable => timeTable.key === curr.key)
          state.list[index] = curr
        },
        computeTodolist: (state, action: PayloadAction<String>) => {
          // Payload = Monday
          const {payload} = action
          const {list}  = state
          
          
          list.map(timeTable => {
            if(timeTable.day === payload){

              // Compute for todolist percentage for each time table from certain day
              const {todolist} = timeTable             
              if(todolist.length == 0)
                timeTable.todolistPercentage = 'Empty'
              else{
                let count = 0;
                let length = todolist.length 

                // Compute for number of checked items
                for(let i = 0; i < length; i++){
                  if(todolist[i].status == true)
                    count++
                }
                const percentage = Math.round((count/todolist.length)*100)                
                timeTable.todolistPercentage = percentage.toString()+'%'
              }
            }            
          })            
        }
    }
})

export const { addTimeTable, 
               getSamples, 
               getCerainTable, 
               updateKey,
               addTodolist,
               deleteCertainTable,
               updateTodolistStatus,
               deleteTodolist,
               getSelectedTable,
               computeTodolist,
               updateTimeTable,
               setDay } = timeTableSlice.actions

export default timeTableSlice.reducer