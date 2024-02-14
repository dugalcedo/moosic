import db from '../db/db.js'
import { Model, DataTypes } from 'sequelize'
import UserModel from './UserModel.js'
import AlbumModel from './AlbumModel.js'

class UserAlbum extends Model {
    static async find(userId, albumId) {
        return await this.findOne({where: {userId, albumId}})
    }

    static async add(userId, newAlbum) {
        const album = await AlbumModel.add(newAlbum)
        const userAlbumMatch = await UserAlbum.findOne({
            where: {
                userId: userId,
                albumId: album.id
            }
        })
        if (userAlbumMatch) return
        const newUserAlbum = await UserAlbum.create({
            rating: newAlbum.rating,
            fam: newAlbum.fam,
            userId,
            albumId: album.id
        })
        return newUserAlbum
    }

    static async addMany(userId, newAlbums) {
        const userAlbums = []
        for (let i = 0; i < newAlbums.length; i++) {
            userAlbums.push(await UserAlbum.add(userId, newAlbums[i]))
        }
        return userAlbums
    }
}

UserAlbum.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AlbumModel,
            key: 'id'
        }
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 10
        }
    },
    fam: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 4
        }
    }
},{
    timestamps: true,
    modelName: 'user_album',
    tableName: 'user_albums',
    sequelize: db
})

UserModel.prototype.getCollection = async function() {
    const userAlbums = await UserAlbum.findAll({
        where: {userId: this.id},
        raw: true
    })
    const collection = await Promise.all(userAlbums.map(async ua => {
        const album = await AlbumModel.findOne({
            where: {id: ua.albumId},
            raw: true
        })
        const item = {
            fam: ua.fam,
            rating: ua.rating,
            artist: album.artist,
            album: album.album,
            year: album.year,
            len: album.len,
            tags: album.tags,
            id: ua.id
        }
        return item
    }))
    return collection
}

export default UserAlbum