// Required dependencies
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

// Export app
module.exports = app => {

    // Setup notes
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);
    
        // GET route for api/notes
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        // POST route for api/notes
        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            newNote.id = randomUUID();
            updateDb();
            res.json(newNote);
        });

        // GET route for api/note with specific id
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        // Delete note with specific id
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            res.send("Delete Success!!!");
        });

        // Display notes.html
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Display index.html
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //Will update file for any added and/or deleted notes
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}