import db from "../db/db.js"
import { Model, DataTypes, fn } from "sequelize"
import validator from 'validator'
import bcrypt from 'bcrypt'

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
    role: {
        type: DataTypes.ENUM(
            'unverified',
            'normal',
            'premium',
            'mod',
            'admin'
        ),
        allowNull: false,
        defaultValue: 'unverified'
    },
    loginKey: {
        type: DataTypes.STRING
    }
}, {
    modelName: 'user',
    tableName: 'users',
    sequelize: db,
    timestamps: true
})

export default UserModel