import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from "sequelize"

const db = new Sequelize(
    process.env.DBURI,
    {
        logging: false
    }
)

export default db