import { config } from 'dotenv'
config()

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "dug.wtf",
    port: 465,
    secure: true,
    auth: {
        user: "dug@dug.wtf",
        pass: process.env.EMAILPASS
    }
})

export default (req, res, next) => {
    res.sendMail = async function(obj) {
        await transporter.sendMail(obj)
    }
    next()
}