import path from 'path'
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default (req, res, next) => {
    req.log = {}
    req.log.debug = str => {
        const {length: len} = str
        console.log("┌" + ("─").repeat(len+2) + "┐")
        console.log(`│ ${str} │`)
        console.log("└" + ("─").repeat(len+2) + "┘")
    }

    // route info
    req.log.debug(`${req.method}${req.url}`)

    const oldSendFile = res.sendFile.bind(res)
    res.sendFile = filePath => {
        oldSendFile(filePath, {
            root: __dirname
        })
    }

    next()
}