import axios from 'axios'
import { User } from '../types'
import { apiBaseUrl } from '../constants'

const create = async (object: User) => {
    const { data } = await axios.post<User>(`${apiBaseUrl}/users`, object)
    return data
}

const login = async (object: User) => {
    const { data } = await axios.post<User>(`${apiBaseUrl}/users`, object)
    return data
}

const getAll = async () => {
    const { data } = await axios.get<User[]>(`${apiBaseUrl}/users`)
    return data
}

export default { create, login, getAll }
