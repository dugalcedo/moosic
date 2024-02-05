import db from "../db/db.js"
import { Model, DataTypes } from "sequelize"
import validator from 'validator'
import bcrypt from 'bcrypt'
import {
    parseCollection,
    compressCollection,
    addToCollection,
    updateInCollection,
    deleteFromCollection
} from './Collection.js'

class UserModel extends Model {
    static keyChars = "1234567890qwertyuiopasdfghjklzxcvbnm"

    static generateLoginKey() {
        let key = ""
        for (let i = 0; i < 20; i++) {
            key += this.keyChars[Math.floor(Math.random()*this.keyChars.length)]
        }
        return key
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }

    getCollection(sortKey = 'rating', sortMethod = 'numeric', sortDirection = 'desc') {
        let collection = parseCollection(this.collection)
        collection.sort((a, b) => {
            return  sortMethod === 'numeric' ?
                        sortDirection === 'desc' ?
                            b[sortKey] - a[sortKey] :
                            a[sortKey] - b[sortKey] :
                        sortDirection === 'desc' ?
                            b[sortKey].localeCompare(a[sortKey]) :
                            b[sortKey].localeCompare(a[sortKey])
        })
        return collection
    }

    async addToCollection(newItem) {
        this.collection = addToCollection(this.collection, newItem)
        await this.save()
        return this.getCollection()
    }

    async updateInCollection(id, newItem) {
        this.collection = updateInCollection(this.collection, id, newItem)
        await this.save()
        return this.getCollection()
    }

    async deleteFromCollection(id) {
        this.collection = deleteFromCollection(this.collection, id)
        await this.save()
        return
    }
}

UserModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            len: [2, 32]
        }
    },
    email: {
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 64],
            safePassword: val => {
                if (!validator.isStrongPassword(val, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })) {
                    throw new Error("Password must be between 8 and 64 characters and include at least one of each: uppercase, lowercase, number, symbol.")
                }
            }
        },
        set(val) {
            this.setDataValue('password', bcrypt.hashSync(val, 5))
        }
    },
    collection: {
        type: DataTypes.STRING,
        notNull: true,
        defaultValue: ""
    },
    role: {
        type: DataTypes.ENUM(
            'unverified',
            'normal',
            'premium',
            'mod',
            'admin'
        ),
        notNull: true,
        defaultValue: 'unverified'
    },
    loginKey: {
        type: DataTypes.STRING,
        notNull: true
    }
}, {
    modelName: 'user',
    tableName: 'users',
    sequelize: db,
    timestamps: true
})

export default UserModel