import axios from 'axios'
import { Product } from '../types'
import { apiBaseUrl } from '../constants'

const getAllProducts = async () => {
    const { data } = await axios.get<Product[]>(`${apiBaseUrl}/products`)
    return data
}
const getAllResellers = async () => {
    const { data } = await axios.get<Product[]>(`${apiBaseUrl}/inventory_data`)
    return data
}

export default { getAllProducts, getAllResellers }
