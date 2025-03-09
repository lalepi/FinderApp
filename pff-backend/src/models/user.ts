import mongoose from 'mongoose'

/**
 * Validates an email address using a regular expression.
 *
 * The regex pattern ensures the following:
 * - Starts with any character(s) except line terminators.
 * - Contains an '@' symbol.
 * - Domain part has valid characters and at least one dot.
 * - Ends with a valid top-level domain.
 *
 * @param email - The email address to validate.
 * @returns `true` if the email is valid, otherwise `false`.
 */

//check if email is valid
const validateEmail = (email: string) => {
    const requirements = /^.+@(?:[\w-]+\.)+\w+$/
    return requirements.test(email)
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: [true, 'An email is required'],
        validate: [validateEmail, 'Please provide a valid email address'],
        minlength: 8,
        unique: true,
    },
    passwordHash: { type: String, required: true },
})

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
