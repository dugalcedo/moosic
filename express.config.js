import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'

export default express => {
    const app = express()

    express.request.log = str => {
        const {length: len} = str
        console.log("┌" + ("─").repeat(len+2) + "┐")
        console.log(`│ ${str} │`)
        console.log("└" + ("─").repeat(len+2) + "┘")
    }

    express.request.jwtSign = payload => jwt.sign(payload, process.env.SECRET, {expiresIn: '2w'})
    express.request.jwtVerify = token => {
        try {
            return jwt.verify(token, process.env.SECRET)
        } catch (error) {
            
        }
    }

    const oldSendFile = express.response.sendFile
    express.response.sendFile = filePath => {
        oldSendFile(filePath, {
            root: __dirname
        })
    }

    express.response.throw = function({error, message, task, req}) {
        console.log(`Error at ${req?.method}${req?.url}`)
        if (task) console.log(`When attempting: ${task}`)
        console.log(error)
        this.json({ error: true, message })
    }

    app.use(cors())
    app.use(express.static('public'))
    app.use(express.json({ strict: false }))
    app.use(cookieParser())

    return app
}
