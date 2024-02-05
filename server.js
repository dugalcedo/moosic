import { dirname } from 'dirname-filename-esm'
const __dirname = dirname(import.meta)

import cors from 'cors'

// env
import dotenv from 'dotenv'
dotenv.config()
const {PORT} = process.env

import db from './db/db.js'

// express
import express from 'express'
const app = express()
const whitelist = [
    'http://localhost:4321',
    'http://localhost:5173'
]
app.use(cors({
    origin: function(origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Blocked by CORS'))
        }
    }
}))
app.use(express.static('public'))
app.use(express.json({ strict: false }))
import cookieParser from 'cookie-parser'
app.use(cookieParser())

// pug
import pug from 'pug'
app.set('views', './views')
app.set('view engine', 'pug')

// controllers
import debugController from './controllers/debugController.js'
app.use(debugController)
import authController from './controllers/authController.js'
app.use(authController)
import emailController from './controllers/emailController.js'
app.use(emailController)
import userController from './controllers/userController.js'
app.use('/api/user', userController)
import albumController from './controllers/albumController.js'
app.use('/api/album', albumController)
import collectionController from './controllers/collectionController.js'
app.use('/api/collection', collectionController)
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