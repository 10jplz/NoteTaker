const fs = require("fs");
const path = require("path");
var data = require("../db/db.json");
var database = path.join(__dirname, '..', 'db', 'db.json');

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile(database, "utf8", function (err, notes) {
            if (err) throw err
            else {
                notes = JSON.parse(notes);
                return res.json(notes);
            }
        });
    });
    app.get("/api/notes/:id", function (req, res) {
        var chosen = req.params.id;

        for (var i = 0; i < data.length; i++) {
            if (chosen === data[i].id) {
                return res.json(data[i])
            }
        }
    });

    app.post("/api/notes", function (req, res) {
        var note = req.body;
        fs.readFile(database, "utf8", function (err, res) {
            if (err) throw err
            else {
                data = JSON.parse(res)
                data.push(note)

                for (var i = 0; i < data.length; i++) {
                    data[i].id = i.toString()
                }

                fs.writeFile(database, JSON.stringify(data), function (err) {
                    if (err) throw err
                    else {
                        console.log("Your Note has been Saved")
                    }
                })
            }
        })

        res.json(note)
    });

    app.delete("/api/notes/:id", function (req, res) {
        var chosen = req.params.id;

        fs.readFile(database, "utf8", function (err, notes) {

            notes = JSON.parse(notes);

            if (err) throw err
            else {
                for (var i = 0; i < data.length; i++) {
                    if (chosen === data[i].id) {
                        data.splice(i, 1);
                    }
                }

                for (var i = 0; i < data.length; i++) {
                    data[i].id = i.toString()
                }

                fs.writeFile(database, JSON.stringify(data), function (err) {
                    if (err) throw err
                    else {
                        console.log("Note has been Updated")
                        return res.json(notes);

                    }
                });
            };

        });
    });


    app.put("/api/notes/:id", function (req, res) {
        var chosen = req.params.id;

        fs.readFile(database, "utf8", function (err, notes) {

            notes = JSON.parse(notes);

            if (err) throw err
            else {
                data = data.map((note) => {
                if(note.id === req.params.id){
                    return {
                        title: req.body.title,
                        text: req.body.text,
                        id: note.id
                    }
                }
                });

                fs.writeFile(database, JSON.stringify(data), function (err) {
                    if (err) throw err
                    else {
                        console.log("Note has been Updated")
                        return res.json(notes);

                    }
                });
            };

        });
    });
}

 
