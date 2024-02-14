import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

import { Router } from "express"
import UserModel from '../models/UserModel.js'

const authController = Router()

authController.use(async (req, res, next) => {

    const token = req.headers['moosic-token']
    console.log("TOKEN: ", token)

    if (token !== 'null' && token != null && token !== undefined) {
        req.user = await UserModel.findOne({
            where: { username: req.jwtVerify(token).username }
        })
        if (req.user) {
            console.log(`User logged in via token: ${req.user.username}`)
        } else console.log('Non-user')
    } else console.log('Non-user')
    
    next()
})

export default authController