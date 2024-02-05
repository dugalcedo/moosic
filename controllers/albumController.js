import lz from 'lz-string'
import usersOnly from "./middleware/usersOnly.js"

/*
    /api/album
*/

import { Router } from "express"

const albumController = Router()

albumController.post('/add', usersOnly, async (req, res) => {
    try {
        const user = req.user
        const pushSuccess = await user.pushToCollection(req.body)
        if (!pushSuccess) {
            res.json({ error: true, msg: "Album already exists" })
            return
        }
        await user.save()
        res.json({ userCollection: user.getCollection() })
    } catch (error) {
        console.log("Failed adding album")
        console.log(error)
        res.json({ error: true })
    }
})

export default albumController