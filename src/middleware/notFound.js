exports.id_checker = (req, res, next) => {

    var id = req.params.id;
    var db = require('../config/db');

    if (id) {

        db.execute("SELECT * FROM users WHERE id = ?", [id], (result) => {

            if (result.length > 0) {
                next();
            } else {
                return res.status(404).json({ "msg":"Not found" });
            }

        });

    } else {
        return res.status(400).json({ "msg": "Internal server error" });
    }
};
