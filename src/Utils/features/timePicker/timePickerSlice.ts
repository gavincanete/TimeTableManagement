import {createSlice, PayloadAction} from '@reduxjs/toolkit' 

interface TimePickerProperties {
    startTime: string,
    endTime: string

    enableStartTime: boolean,
    enableEndTime: boolean

    history?: {
        prevStartTime?: string,
        prevEndTime?: string
    }
}

const initialState: TimePickerProperties = {
    startTime: '',
    endTime: '',
    enableStartTime: false,
    enableEndTime: false,
    history:{}
}

export const timePickerSlice = createSlice({
    name: 'timePicker',
    initialState,
    reducers: {
        showStartTime: (state) => {
            state.enableStartTime = true
        },
        hideStartTime: (state) => {
            state.enableStartTime = false
        },
        setStartTime: (state, action: PayloadAction<string>) => {
            const time:string[] = action.payload.split(' ')
            const hourMinute:string[] = time[4].split(':')
            const hour: number = Number(hourMinute[0])
            
            const convertedHour: string = (hour > 12) ? `${hour%12}:${hourMinute[1]}pm`: `${hour}:${hourMinute[1]}am`     

            if(hour == 0)
                state.startTime = `12:${hourMinute[1]}am`
            else if(hour == 12)
                state.startTime =`12:${hourMinute[1]}pm`
            else        
                state.startTime = convertedHour

            state.enableStartTime = false
        },
        showEndTime: (state) => {
            state.enableEndTime = true
        },
        hideEndTime: (state) => {
            state.enableEndTime = false
        },
        setEndTime: (state, action: PayloadAction<string>) => {
            const time:string[] = action.payload.split(' ')
            const hourMinute:string[] = time[4].split(':')
            const hour: number = Number(hourMinute[0])
            
            const convertedHour: string = (hour > 12) ? `${hour%12}:${hourMinute[1]}pm`: `${hour}:${hourMinute[1]}am`     

            if(hour == 0)
                state.endTime = `12:${hourMinute[1]}am`
            else if(hour == 12)
                state.endTime =`12:${hourMinute[1]}pm`
            else        
                state.endTime = convertedHour

            state.enableEndTime = false
        },
        clearTime: (state) => {
            state.startTime = 'Start Time'
            state.endTime = 'End Time'
        },
        setHistory: (state) => {
            console.log('STATE',state)
            if(state.history){
                state.history.prevStartTime = state.startTime
                state.history.prevEndTime = state.endTime                
            }
        },        
    }
})

// TODO: Add another action for setting History

export const {showStartTime, 
              hideStartTime,
              setStartTime,
              showEndTime,
              hideEndTime,
              setHistory,
              clearTime,
              setEndTime} = timePickerSlice.actions

export default timePickerSlice.reducer