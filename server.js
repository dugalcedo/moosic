// env
import dotenv from 'dotenv'
dotenv.config()
const {PORT} = process.env

import db from './db/db.js'

// express
import express from 'express'
import expressConfig from './express.config.js'
const app = expressConfig(express)


import usersOnly from './controllers/middleware/usersOnly.js'
// controllers
import debugController from './controllers/debugController.js'
app.use(debugController)
import testController from './controllers/testController.js'
app.use('/api/test', testController)
import authController from './controllers/authController.js'
app.use(authController)
import emailController from './controllers/emailController.js'
app.use(emailController)
import userController from './controllers/userController.js'
app.use('/api/user', userController)
import collectionController from './controllers/collectionController.js'
app.use('/api/collection', usersOnly, collectionController)
import homeController from './controllers/homeController.js'
app.use(homeController)


start()

async function start() {
    try {
        console.log("Connecting to database...")
        const connection = await db.sync({ alter: true })
        console.log("Connected.")
        app.listen(PORT, ()=>{
            console.log(`http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}