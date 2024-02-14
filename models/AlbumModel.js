import db from "../db/db.js"
import { Model, DataTypes } from 'sequelize'

const sanitize = str => {
    str = str.trim()
    str = str.toLowerCase()
    str = str.replaceAll(/\s+/gm, ' ')
    str = str.replaceAll('&#34;', "\"")
    return str
}


class AlbumModel extends Model {
    static async existing(newAlbum) {
        let match = await this.findOne({
            where: {
                artist: sanitize(newAlbum.artist),
                album: sanitize(newAlbum.album)
            }
        })
        return match
    }

    static async add(newAlbum) {
        let album
        let existing = await AlbumModel.existing(newAlbum)
        if (existing) {
            album = existing
        } else {
            album = await AlbumModel.create(newAlbum)
        }
        return album
        
    }

    static async addMany(newAlbums) {
        let albums = []
        for (let i = 0; i < newAlbums.length; i++) {
            albums.push(await AlbumModel.add(newAlbums[i]))
        }
        return albums
    }
}

AlbumModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('artist', sanitize(val))
        }
    },
    album: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('album', sanitize(val))
        }
    },
    len: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 1440
        }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: -10000,
            max: 10000
        }
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false
    }
}, {
    modelName: 'album',
    tableName: 'albums',
    sequelize: db,
    timestamps: true
})

export default AlbumModel