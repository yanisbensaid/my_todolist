const db = require("../../config/db");

exports.getUser = async (req, res) => {

    db.execute("SELECT * FROM user", (err, result) => {

        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }
        res.json({ "id": result[0].id,
                   "email": result[0].email,
                   "password": result[0].password,
                   "created_at": result[0].created_at,
                   "firstname": result[0].firstname,
                   "name": result[0].name });
                   
    });

};


exports.getTodoByUser = async (req, res) => {

    const id_user = req.user.id;

    if (!id_user) {
        return res.status(400).json({ "msg": "No ID given" });
    }

    db.execute("SELECT * FROM todo WHERE user_id = ?", [id_user], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }
        res.json(result);

    });

};


exports.getUserByIdOrEmail = async (req, res) => {

    const { id_or_email } = req.params;

    if (!id_or_email) {
        return res.status(400).json({ "msg": "No ID or email given" });
    }

    db.execute("SELECT * FROM user WHERE id = ? OR email = ?", [id_or_email, id_or_email], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }
        res.json(result);

    });

};


exports.updateUserByID = async (req, res) => {

    const { id } = req.params;
    const { email, password, firstname, name } = req.body;

    if (!id) {
        return res.status(400).json({ "msg": "No ID given" });
    }

    db.execute("UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?", 
    [email, password, firstname, name, id],  (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }

        db.execute("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
        
            if (err) {
                console.log(err);
                return res.status(400).json({ "msg": "Error" });
            }

            if (result[0]) {
                res.json({ "id": result[0].id,
                           "email": result[0].email,
                           "password": result[0].password,
                           "created_at": result[0].created_at,
                           "firstname": result[0].firstname,
                           "name": result[0].name });
            } else {
                res.status(404).json({ "msg": "User not found" });
            }

        });

    });

}


exports.deleteUserByID = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ "msg": "No ID given" });
    }

    db.execute("DELETE FROM user WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ "msg": "User not found" });
        }

        res.json({ "msg": "Successfully deleted record number:" + id });
    });

};
