import { Router } from "express"
import AlbumModel from "../models/AlbumModel.js"
import UserAlbum from "../models/UserAlbum.js"
import roleCheck from "./middleware/roleCheck.js"
const collectionController = Router()

/*
    /api/collection
*/

// add one
collectionController.post('/', async (req, res) => {
    let album
    try {
        album = await AlbumModel.add(req.body)
    } catch (error) {
        console.log("Error creating album at POST/api/collection")
        console.log(error)
        res.json({error: true})
        return
    }
    try {
        const newUserAlbum = await UserAlbum.add(req.user.id, req.body)
        res.json(newUserAlbum.dataValues)
    } catch (error) {
        res.throw({req, error, message: "Error posting userAlbum"})
    }
})

// add many
collectionController.post('/many', roleCheck(['premium', 'mod', 'admin']), async (req, res) => {
    try {
        const albums = await AlbumModel.addMany(req.body)
        const userAlbums = await UserAlbum.addMany(req.user.id, albums)
        res.json({albums, userAlbums})
    } catch (error) {
        res.throw({req, error, message: "Error posting many userAlbums"})
    }
})

collectionController.put('/', async (req, res) => {

})

collectionController.delete('/', async (req, res) => {
    try {
        await UserAlbum.destroy({ where: {id: req.body.id}})
        res.json({})
    } catch (error) {
        res.throw({req, error, message: "Error destroying album"})
    }
})

export default collectionController