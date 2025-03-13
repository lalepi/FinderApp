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

const basicUserSchema = new mongoose.Schema({
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

//this is the schema for a basic user that can be extended to create a retailer
export default basicUserSchema
