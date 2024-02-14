/*
    /api/test
*/

import { Router } from "express"
const testController = Router()

testController.get('/', (req, res) => {
    res.json({message: 'test successful'})
})

testController.get('/error', (req, res) => {
    if (Math.random()<0.5) {
        res.throw({req, message: 'test error'})
    } else {
        res.send({message: 'error failed (success!)'})
    }
})

export default testController