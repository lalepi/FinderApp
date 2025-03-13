import mongoose from 'mongoose'
import basicUserSchema from './basicUser'

//user schema as a subclass of basicUserSchema
const userSchema = new mongoose.Schema(basicUserSchema.obj)

// Modify object before JSON serialization, remove _id and __v and add id, to make it more user-friendly
userSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed so it is deleted from the object
        delete returnedObject.passwordHash
    },
})

const User = mongoose.model('User', userSchema)

export default User
