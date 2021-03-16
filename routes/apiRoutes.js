//Linking our routes to our DATA 
const fs = require("fs");
const path = require("path");
const data = require("../db/db.json");
const database = path.join(__dirname, '..', 'db', 'db.json');


//ROUTING 
module.exports = (app) => {

    app.get('api/notes', (req, res) => {
        let dbData = fs.readFileSync("db/db.json", "utf-8")
      //  dbData = JSON.parse(dbData);
        return res.json(dbData);
    })


    app.post('api/notes', (req, res) => {
        let dbData = fs.readFileSync("db/db.json", "utf-8");
        dbData = JSON.parse(dbData);
        let newDBState = {
            "title": req.body.title,
            "text": req.body.text,
            "id": Date.now(),
        }


        dbData.push(newDBState);
        fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(dbData, null, 2));
        res.send(true);
    })
}