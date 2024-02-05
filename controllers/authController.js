import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

import { Router } from "express"
import UserModel from '../models/UserModel.js'

const authController = Router()

authController.use(async (req, res, next) => {

    // tokens
    req.jwt = {}
    req.jwt.sign = payload => jwt.sign(payload, process.env.SECRET, {expiresIn: '2w'})
    req.jwt.verify = token => jwt.verify(token, process.env.SECRET)

    // const token = req.cookies['token']
    const token = req.headers['moosic-token']

    if (token !== 'null') {
        req.user = await UserModel.findOne({
            where: { username: req.jwt.verify(token).username }
        })
        if (req.user) {
            console.log(`User logged in via token: ${req.user.username}`)
        } else console.log('Non-user')
    } else console.log('Non-user')
    
    next()
})

export default authController