const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    try {
      	const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY)
      	req.userId = decoded._id
      	next()
    } catch (error) {
      	es.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = authMiddleware