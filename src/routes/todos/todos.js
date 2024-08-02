const db = require("../../config/db");


exports.createTodo = async (req, res) => {

    const { title, description, due_time, user_id, status } = req.body;

    if (!title || !description || !due_time || !user_id || !status) {
        return res.status(400).send("Some elements are missing");
    }

    db.execute("INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)", [title, description, due_time, user_id, status], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }
        res.json({ "title": title,
                   "description": description,
                   "due_time": due_time,
                   "user_id": user_id,
                   "status": status });
    });

};


exports.findTodo = async (req, res) => {

    db.execute("SELECT * FROM todo", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }
        res.json(result);
    });

}


exports.findTodoByID = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ "msg": "No ID given" });
    }

    db.execute("SELECT * FROM todo WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }
        res.json(result);
    });

};


exports.updateTodoByID = async (req, res) => {

    const { id } = req.params;
    const { title, description, due_time, user_id, status } = req.body;

    if (!id) {
        return res.status(400).json({ "msg": "No ID given" });
    }

    db.execute("UPDATE todo SET title=?, description=?, due_time=?, user_id=?, status=? WHERE id=?", 
        [title, description, due_time, user_id, status, id], 
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ "msg": "Error" });
            }
            res.json({ "title": title,
                       "description": description,
                       "due_time": due_time,
                       "user_id": user_id,
                       "status": status });
        }
    );
    
};


exports.deleteTodoByID = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ "msg": "No ID given" });
    }

    db.execute("DELETE FROM todo WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ "msg": "Error" });
        }
        res.json({ "msg": "Todo deleted" });
    });

};
