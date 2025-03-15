import { expect, test, describe, beforeEach, beforeAll } from 'vitest'
import User from '../models/user'
import Retailer from '../models/retailer'
import supertest from 'supertest'
import app from '../app'
import bcrypt from 'bcrypt'
const api = supertest(app)

let legitUser = {
    id: 1,
    username: 'Cool Name',
    email: 'coolEmail@email.com',
    password: 'passwordmustbe10',
}

let legitRetailer = {
    id: 2,
    username: 'Cool Retailer',
    email: 'coolretailer@email.com',
    password: 'passwordmustbe10',
    storeName: 'Cool Store',
    address: '1234 Cool St',
    phone: 1234567890,
    userType: 'retailer',
}
describe('login tests', () => {
    beforeAll(async () => {
        await User.deleteMany({})
        await Retailer.deleteMany({})

        // make the initial user and retailer
        const userPasswordHash = await bcrypt.hash(legitUser.password, 10)
        let user = new User({
            ...legitUser,
            passwordHash: userPasswordHash,
        })
        await user.save()

        const retailerPasswordHash = await bcrypt.hash(
            legitRetailer.password,
            10
        )
        let retailer = new Retailer({
            ...legitRetailer,
            passwordHash: retailerPasswordHash,
        })
        await retailer.save()

        //get the tokens for the user and retailer
        const userResponse = await api.post('/login').send(legitUser)
        const retailerResponse = await api.post('/login').send(legitRetailer)

        let userToken = userResponse.body.token
        let retailerToken = retailerResponse.body.token
    })

    test('login with valid user credentials', async () => {
        const response = await api
            .post('/login')
            .send({
                username: legitUser.username,
                password: legitUser.password,
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.token).toBeDefined()
    })

    test('login with valid retailer credentials', async () => {
        const response = await api
            .post('/login')
            .send({
                username: legitRetailer.username,
                password: legitRetailer.password,
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.token).toBeDefined()
    })

    test('login with invalid user credentials', async () => {
        const response = await api
            .post('/login')
            .send({
                username: legitUser.username,
                password: 'wrongPassword',
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBe('invalid username or password')
    })

    test('login with invalid retailer credentials', async () => {
        const response = await api
            .post('/login')
            .send({
                username: legitRetailer.username,
                password: 'wrongPassword',
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBe('invalid username or password')
    })
    test('login with empty credentials', async () => {
        const response = await api
            .post('/login')
            .send({})
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBe('invalid username or password')
    })
    test('login with wrong username', async () => {
        const response = await api
            .post('/login')
            .send({
                username: 'wrongUsername',
                password: legitUser.password,
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBe('invalid username or password')
    })
})
describe('register tests', () => {
    describe('user', () => {
        test('register a new user', async () => {
            const newUser = {
                username: 'newUser1',
                email: 'email1@email.com',
                password: 'passwordmustbe10',
            }
            const response = await api
                .post('/register')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        })
        test('register a new user with a password less than 10 characters', async () => {
            const newUser = {
                username: 'newUser2',
                email: 'newuser@email.com',
                password: 'short',
            }
            const response = await api
                .post('/register')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toBe(
                'Password must be at least 10 characters long'
            )
        })
        test('register a user with an existing username', async () => {
            const newUser = {
                username: 'Cool Name',
                email: 'email2@email.com',
                password: 'passwordmustbe10',
            }
            const response = await api
                .post('/register')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toContain('Username already exists')
        })
        test('register a user with an existing email', async () => {
            const newUser = {
                username: 'newUser3',
                email: 'coolEmail@email.com',
                password: 'passwordmustbe10',
            }
            const response = await api
                .post('/register')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toContain(
                'Email address already exists'
            )
        })
        test('register a user with same password as another user', async () => {
            const newUser = {
                username: 'newUser4',
                email: 'asd@email.com',
                password: 'passwordmustbe10',
            }
            const response = await api
                .post('/register')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        })
    })
    describe('retailer', () => {
        test('register a new retailer', async () => {
            const newRetailer = {
                username: 'newRetailer',
                email: 'retailer@email.com',
                password: 'passwordmustbe10',
                storeName: 'newStore22',
                address: '1234 New St',
                phone: 12345678901,
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        })
        test('register a retailer with an existing store', async () => {
            const newRetailer = {
                username: 'Cool Retailerxx',
                email: 'xxunique@email.com',
                password: 'passwordmustbe10',
                storeName: 'Cool Store',
                address: '1234 New St',
                phone: 12345678901,
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toContain('Store name already exists')
        })

        test('register a retailer with an existing phone number', async () => {
            const newRetailer = {
                username: 'Cool Retailerxx',
                email: 'xxunique@email.com',
                password: 'passwordmustbe10',
                storeName: 'Cool Storex',
                address: '1234 New St',
                phone: 1234567890,
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toContain('Phone number already exists')
        })
        test('register a retailer without a store name', async () => {
            const newRetailer = {
                username: 'newRetailer',
                email: 'retailer@email.com',
                password: 'passwordmustbe10',
                storeName: '',
                address: '1234 New St',
                phone: 1234567890,
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toBe(
                'Retailer validation failed: storeName: Path `storeName` is required.'
            )
        })
        test('register a retailer without an address', async () => {
            const newRetailer = {
                username: 'newRetailer',
                email: 'retailer@email.com',
                password: 'passwordmustbe10',
                storeName: 'newStore',
                address: '',
                phone: 1234567890,
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toBe(
                'Retailer validation failed: address: Path `address` is required.'
            )
        })
        test('register a retailer without a phone number', async () => {
            const newRetailer = {
                username: 'newRetailer',
                email: 'retailer@email.com',
                password: 'passwordmustbe10',
                storeName: 'newStore',
                address: '1234 New St',
                phone: '',
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toBe(
                'Retailer validation failed: phone: Path `phone` is required.'
            )
        })
        test('register a retailer with a phone number less than 10 characters', async () => {
            const newRetailer = {
                username: 'newRetailer',
                email: 'retailer@email.com',
                password: 'passwordmustbe10',
                storeName: 'newStore',
                address: '1234 New St',
                phone: 123456789,
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toContain(
                'is shorter than the minimum allowed length (10).'
            )
        })
        test('register a retailer with a phone number that contains non-numeric characters', async () => {
            const newRetailer = {
                username: 'newRetailer',
                email: 'retailer@email.com',
                password: 'passwordmustbe10',
                storeName: 'newStore',
                address: '1234 New St',
                phone: '123456789a',
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toBe(
                'Retailer validation failed: phone: Phone number must contain only numeric characters'
            )
        })
        test('register a retailer with a too short storename', async () => {
            const newRetailer = {
                username: 'newRetailer',
                email: 'retailer@email.com',
                password: 'passwordmustbe10',
                storeName: 'AB',
                address: '1234 New St',
                phone: '123456789a',
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toContain(
                'is shorter than the minimum allowed length (3).'
            )
        })
        test('register a retailer with a too short address', async () => {
            const newRetailer = {
                username: 'newRetailer',
                email: 'retailer@email.com',
                password: 'passwordmustbe10',
                storeName: 'AB',
                address: 'ST',
                phone: '123456789a',
                role: 'retailer',
            }
            const response = await api
                .post('/register')
                .send(newRetailer)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(response.body.error).toContain(
                'is shorter than the minimum allowed length (5).'
            )
        })
    })
})
