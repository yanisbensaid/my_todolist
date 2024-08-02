const jwt = require('jsonwebtoken');

exports.authentification = async (req, res, next) => {

    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({"msg":"No token, authorization denied"});
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(400).json({"msg":"Token is not valid"});
        }
        req.user = user["id"];
        next();
    });

}
