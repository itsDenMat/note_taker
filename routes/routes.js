// Required dependencies
const router = require('express').Router();
const { randomUUID } = require('crypto');
const { Router } = require('express');
const fs = require('fs');
const path = require('path');

    // Pull notes
    router.get("/notes", function(req, res) {
        
        fs.readFile("db/db.json","utf8", (err, data) => {
    
            if (err) throw err;
    
            var notes = JSON.parse(data);

        res.json(notes);
        })
    });

        // POST route for api/notes
        router.post("/notes", function(req, res) {
            let newNote = req.body;
            fs.readFile("db/db.json","utf8", (err, data) => {
    
                if (err) throw err;
        
                var notes = JSON.parse(data);
            newNote.id = randomUUID();
            notes.push(newNote);
            updateDb(notes);
            res.json(newNote);
            })
        });

        // Delete note with specific id
        router.delete("/notes/:id", function(req, res) {
            fs.readFile("db/db.json","utf8", (err, data) => {
    
                if (err) throw err;
        
                var notes = JSON.parse(data);
            const newNotes = notes.filter(note => note.id !== req.params.id)
            updateDb(newNotes);
            res.status(200).end();
            })
        });

        //Will update file for any added and/or deleted notes
        function updateDb(notes) {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

module.exports = router;