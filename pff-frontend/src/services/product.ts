import axios from 'axios'
import { Product } from '../types'
import { apiBaseUrl } from '../constants'

const getAll = async () => {
    const { data } = await axios.get<Product[]>(`${apiBaseUrl}/products`)
    return data
}

export default { getAll }
