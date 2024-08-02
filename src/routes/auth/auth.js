const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


function error_info(email, password, firstname, name, callback) {

    if (email === undefined || password === undefined || firstname === undefined || name === undefined) {
        res.status(400).json({ "msg": "Error" });
        callback(true);
    }

    db.execute("SELECT * FROM user WHERE email = ?", [email], (err, result) => {

        if (err) {
            console.log(err);
            callback(true);
        } else {
            if (result && result.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        }

    });
}


exports.register  = async (req, res) => {

    const { email, password, name, firstname } = req.body;

    error_info(email, password, name, firstname, (error) => {
        if (error) {
            return;
        }
    });

    const securePassword = await bcrypt.hash(password, 10);

    db.execute("INSERT INTO user (email, password, firstname, name) VALUES (?, ?, ?, ?)", [email, securePassword, firstname, name], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Account already exists" });
        }
        const token = jwt.sign({ id: result.insertId }, process.env.SECRET);
        res.json({ "token": token });
    });

};


exports.login = (req, res) => {

    const { email, password } = req.body;

    error_info(email, password, null, null, (error) => {
        if (error) {
            return;
        }
    });

    db.execute("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
        if (err || !result) {
            console.log(err);
            return res.status(500).json({ "msg": "Database error" });
        }

        if (result.length === 0) {
            return res.status(400).json({ "msg": "User not found" });
        }

        const decryptPWD = bcrypt.compare(password, result[0].password);
        if (!decryptPWD) {
            return res.status(400).json({ "msg": "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: result[0].id }, process.env.SECRET);
        res.json({ "token": token });
        
        console.log("\nUser logged in\n");
        console.log("Name: " + result[0].name);
        console.log("Firstname: " + result[0].firstname);
    });

}
