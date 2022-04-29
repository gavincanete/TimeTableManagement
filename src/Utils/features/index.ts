import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit"
import AsyncStorage, {AsyncStorageStatic} from '@react-native-async-storage/async-storage'
import {persistStore, persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'

import timeTableReducer from './timeTable/timeTableSlice'
import timePickerReducer from './timePicker/timePickerSlice'
import userReducer,{initialState as initialStateUser} from './user/userSlice'

interface IPersistConfig {
    key: string,
    storage: AsyncStorageStatic,
    blacklist?: Array<string>,
}

const persistConfig:IPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    TimeTable: timeTableReducer,    
    TimePicker: timePickerReducer,
    User: userReducer
})

const persistTimeTable = persistReducer(persistConfig, rootReducer)

export const timeTableStore = configureStore({
    reducer: {
        Root: persistTimeTable
    },
    middleware: [thunk]
})

export const persistor = persistStore(timeTableStore)

export type RootState = ReturnType<typeof timeTableStore.getState>
export type AppDispatch = typeof timeTableStore.dispatch