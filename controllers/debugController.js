export default (req, res, next) => {
    req.log(`${req.method}${req.url}`)

    next()
}