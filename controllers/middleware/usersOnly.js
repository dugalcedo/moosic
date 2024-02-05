export default function usersOnly(req, res, next) {
    if (!req.user) {
        res.status(401).json({ error: true, message: "You must be logged in to do this." })
    } else {
        next()
    }
}