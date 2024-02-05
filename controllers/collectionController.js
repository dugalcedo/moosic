import { Router } from "express"

const collectionController = Router()

/*
    /api/collection
*/

collectionController.get('/', (req, res) => {
    if (!req.user) {
        res.json([])
    } else {
        const collection = req.user.getCollection()
        res.json(collection)
    }
})

collectionController.post('/', async (req, res) => {
    try {
        const newCollection = await req.user.addToCollection(req.body)
        res.json({ error: false, collection: newCollection })
    } catch (error) {
        console.log("Failed adding album")
        console.log(error)
        res.json({ error: true })
    }
})

collectionController.put('/', async (req, res) => {
    try {
        const newCollection = await req.user.updateInCollection(req.body.id, req.body)
        res.json({ error: false, update: req.body})
    } catch (error) {
        console.log("Failed editing album")
        console.log(error)
        res.json({ error: true })
    }
})

collectionController.delete('/', async (req, res) => {
    try {
        await req.user.deleteFromCollection(req.body.id)
        res.json({ error: false })
    } catch (error) {
        console.log("Failed deleting album")
        console.log(error)
        res.json({ error: true })
    }
})

export default collectionController