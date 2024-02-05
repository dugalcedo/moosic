/*
    /api/user
*/

import { Router } from "express"
import UserModel from "../models/UserModel.js"

const userController = Router()

userController.post('/register', async (req, res) => {
    try {
        req.body.loginKey = UserModel.generateLoginKey()
        const newUser = await UserModel.create(req.body)
        const userData = {...newUser.dataValues}
        delete userData.password
        await res.sendMail({
            from: 'dug@dug.wtf',
            to: req.body.email,
            subject: "Welcome to Moosic!",
            text: `Here is your first-time login key: ${req.body.loginKey}`
        })
        res.json({ error: false, newUser, token: req.jwt.sign(userData) })
    } catch (error) {
        console.log(`Error creating user`)
        console.log(error)
        res.json({ error: true, message: error.errors[0].message })
    }
})

userController.post('/login', async (req, res) => {
    const {
        password,
        usernameOrEmail
    } = req.body

    if (usernameOrEmail.includes('@')) {
        var identifier = 'email'
    } else {
        var identifier = 'username'
    }

    try {
        const match = await UserModel.findOne({
            where: {[identifier]: usernameOrEmail}
        })

        // if user not found
        if (!match) {
            res.json({ error: true, message: `${usernameOrEmail} is not a user in the moosic database` })
            return
        }

        const validPassword = match.checkPassword(password)

        if (!validPassword) {
            res.json({ error: true, message: `wrong password` })
            return
        }

        const userData = {...match.dataValues}
        const token = req.jwt.sign(userData)
        delete userData.password

        res.json({ error: false, token, userData })

    } catch (error) {
        console.log(`Error logging in`)
        console.log(error)
        res.json({ error: true, message: error.errors[0].message })
    }
})

userController.put('/verify', async (req, res) => {
    if (req.body.key === req.user.loginKey) {
        await req.user.update({ role: 'normal' })
        res.json({})
    } else {
        res.json({ error: true, msg: "Invalid key" })
    } 
})

userController.get('/', (req, res) => {
    // console.log('User: ', req.user)
    try {
        const userData = {...(req.user?.dataValues||{})}
        delete userData.password
        delete userData.loginKey
        userData.collection = req.user.getCollection()
        // console.log(userData)
        res.json(userData)
    } catch (error) {
        console.log(error)
        res.json({ error: true })
    }
})

export default userController