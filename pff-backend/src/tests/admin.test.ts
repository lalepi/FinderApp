import { expect, test, describe, beforeEach, beforeAll } from 'vitest'
import User from '../models/user'
import supertest from 'supertest'
import app from '../app'
import bcrypt from 'bcrypt'
const api = supertest(app)

describe('Admin Rights Tests', () => {
    let adminToken: string
    let userToken: string
    beforeAll(async () => {
        await User.deleteMany({})
        // Create an admin user
        const adminPasswordHash = await bcrypt.hash('adminPassword', 10)
        const adminUser = new User({
            username: 'adminUser',
            email: 'admin@example.com',
            passwordHash: adminPasswordHash,
            isAdmin: true,
        })
        await adminUser.save()

        // Create a regular user
        const userPasswordHash = await bcrypt.hash('userPassword', 10)
        const regularUser = new User({
            username: 'regularUser',
            email: 'user@example.com',
            passwordHash: userPasswordHash,
            isAdmin: false,
        })
        await regularUser.save()
        // Log in as admin
        const adminResponse = await api
            .post('/login')
            .send({ username: 'adminUser', password: 'adminPassword' })
        adminToken = adminResponse.body.token

        // Log in as regular user
        const userResponse = await api
            .post('/login')
            .send({ username: 'regularUser', password: 'userPassword' })
        userToken = userResponse.body.token
    })

    test('Admin can access admin route', async () => {
        const response = await api
            .get('/admin')
            .set('Authorization', `Bearer ${adminToken}`)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Welcome, admin!')
    })

    test('Non-admin cannot access admin route', async () => {
        const response = await api
            .get('/admin')
            .set('Authorization', `Bearer ${userToken}`)
        expect(response.status).toBe(403)
        expect(response.body.error).toBe('access denied')
    })
    test('Admin can grant admin privileges to a user', async () => {
        // Create a new user to grant admin privileges
        const newUser = new User({
            username: 'newUser',
            email: 'newuser@example.com',
            passwordHash: await bcrypt.hash('newUserPassword', 10),
            isAdmin: false,
        })
        const savedUser = await newUser.save()

        // Grant admin privileges
        const response = await api
            .patch(`/admin/grant-admin/${savedUser.id}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ isAdmin: true })

        expect(response.status).toBe(200)
        expect(response.body.isAdmin).toBe(true)

        // Verify the user is updated in the database
        const updatedUser = await User.findById(savedUser.id)
        expect(updatedUser?.isAdmin).toBe(true)
    })
    test('Non-admin cannot grant admin privileges to a user', async () => {
        // Create a new user to attempt granting admin privileges
        const newUser = new User({
            username: 'anotherUser',
            email: 'anotheruser@example.com',
            passwordHash: await bcrypt.hash('anotherUserPassword', 10),
            isAdmin: false,
        })
        const savedUser = await newUser.save()

        // Attempt to grant admin privileges as a non-admin
        const response = await api
            .patch(`/admin/grant-admin/${savedUser.id}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ isAdmin: true })

        expect(response.status).toBe(403)
        expect(response.body.error).toBe('access denied')

        // Verify the user is not updated in the database
        const updatedUser = await User.findById(savedUser.id)
        expect(updatedUser?.isAdmin).toBe(false)
    })
})
