import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from '../store'
import { User } from '../types'
import userService from '../services/user'

const initialState: User[] = []

const loginSlice = createSlice({
    name: 'login',

    initialState: initialState,
    reducers: {
        signUpUser: (state, action) => {
            state.push(action.payload)
        },
        setUser: (state, action) => {
            return action.payload
        },
    },
})

export const { signUpUser, setUser } = loginSlice.actions

export const createUser = (content: User) => {
    return async (dispatch: AppDispatch) => {
        const user = await userService.create(content)

        dispatch(signUpUser(user))
    }
}

export const loginUser = (content: User) => {
    return async (dispatch: AppDispatch) => {
        try {
            const user = await userService.login(content)
            dispatch(setUser(user))
        } catch (error) {
            console.log('Error wrong usermane:', error)
        }
    }
}

export default loginSlice.reducer
