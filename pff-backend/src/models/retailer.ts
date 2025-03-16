import mongoose from 'mongoose'
import basicUserSchema from './basicUser'
import { UserDbConnection } from '../utils/db'
import { setToJSON } from '../utils/middleware'

// Retailer schema as a subclass of basicUserSchema
const retailerSchema = new mongoose.Schema(basicUserSchema.obj)

const validatePhoneNumber = (phone: string) => {
    const requirements = /^\d+$/ // only digits
    return requirements.test(phone)
}

retailerSchema.add({
    storeName: { type: String, required: true, minlength: 3, unique: true },
    address: { type: String, required: true, minlength: 5 },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        unique: true,
        validate: [
            validatePhoneNumber,
            'Phone number must contain only numeric characters',
        ],
    },
})

setToJSON(retailerSchema)

const { userDB } = UserDbConnection()

// Use the userDB to create the User model
const Retailer = userDB.model('Retailer', retailerSchema)

export default Retailer
