import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface IUser {
  username: string,
  password: string,
  confirmedPassword?: string,
  hasRegistered?: boolean,
  canLogin?: boolean
}

export const initialState: IUser = {
  username: '',
  password: '',
  hasRegistered: false,
  canLogin: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeCredential: (state, action: PayloadAction<IUser>) => {
            state.username = action.payload.username
            state.password = action.payload.password
            state.hasRegistered = true
        },        
        login: (state) => {
            state.canLogin = true            
        },
        logout: (state) => {
            state.canLogin = !state.canLogin            
        }
    }
})

console.log(userSlice)

export const {storeCredential,
              login,
              logout,
              } = userSlice.actions

export default userSlice.reducer

