import { Router, Request, Response } from 'express'
import User from '../models/user'
import { adminCheck } from '../utils/middleware'
const adminRouter = Router()

// Grant or revoke admin privileges
adminRouter.patch(
    '/grant-admin/:id',
    adminCheck,
    async (request: Request, response: Response) => {
        const { id } = request.params
        const { isAdmin } = request.body

        try {
            const user = await User.findByIdAndUpdate(
                id,
                { isAdmin },
                { new: true, runValidators: true }
            )

            if (!user) {
                return response.status(404).json({ error: 'User not found' })
            }

            response.status(200).json(user)
        } catch (error) {
            response
                .status(400)
                .json({ error: 'Failed to update admin privileges' })
        }
    }
)

adminRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome, admin!' })
})

export default adminRouter
