const authorization = (req, res, next) => {
    if (!req.session.user) {
        res.status(401).send("Must be signed in")
    } else {
        next()
    }
}

module.exports = authorization;