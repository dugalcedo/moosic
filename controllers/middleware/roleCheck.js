export default (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        res.status(401).json({ error: true, message: 'you are not authorized '})
        return
    }
    next()
}