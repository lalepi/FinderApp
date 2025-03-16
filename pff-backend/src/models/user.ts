import mongoose from 'mongoose'
import basicUserSchema from './basicUser'
import { UserDbConnection } from '../utils/db'
import { setToJSON } from '../utils/middleware'

//user schema as a subclass of basicUserSchema
const userSchema = new mongoose.Schema(basicUserSchema.obj)

setToJSON(userSchema)

const { userDB } = UserDbConnection()
// Use the userDB to create the User model
const User = userDB.model('User', userSchema)

export default User
