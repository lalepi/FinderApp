import mongoose from 'mongoose'
import basicUserSchema from './basicUser'

// Retailer schema as a subclass of basicUserSchema
const retailerSchema = new mongoose.Schema(basicUserSchema.obj)

retailerSchema.add({
    storeName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true, minlength: 10 },
})

// Modify object before JSON serialization, remove _id and __v and add id, to make it more user-friendly
retailerSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed so it is deleted from the object
        delete returnedObject.passwordHash
    },
})

const Retailer = mongoose.model('Retailer', retailerSchema)

export default Retailer
