import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'
import { User } from '../types'
import { AppDispatch } from '../store'

const initialState: User[] = []

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            return action.payload
        },
    },
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
    return async (dispatch: AppDispatch) => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}

export default userSlice.reducer
