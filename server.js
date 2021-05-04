// Constants
const app = express();
const express = require("express");
const path = require("path");
const { json } = require("express");
const fs = require("fs");
const db = `${__dirname}/db/db.json`
let notes = [];

// functions

const writeNotes = () => {
    fs.writeFileSync(db, JSON.stringify(notes), "utf8");
};
const deleteNotes = (id) => {
    notes.splice(
        notes.findIndex((note) => note.id == id),
        1
    );
    writeNotes();
    return notes;
};
const getNotes = () => {
    const temp = fs.readFileSync(db, "utf8", (err, data) => {
        if (err) throw err;
        const updateNotes = [];
        JSON.parse(data).foreach((note) => {
            updateNotes.push(note);
        });
        return updateNotes;
    });
    notes = JSON.parse(temp);
    return notes;
};

//IDs
const generateIDs = () => {
    const currentIDs = [];
    notes.forEach((note) => currentIDs.push(note.id));

    let newID = "";
    do {
        newID = Math.floor(Math.random() * 10000 + 1).toString();
    } while (currentIDs.includes(newID));
    return newID;
    };

//Routing
//show notes
app.get("/api/notes", (req, res) => {
    return res.json(getNotes());
});
//delete notes
app.delete("/api/notes/:id", (req, res) => {
    return res.json(deleteNotes(req.params.id));
});
// save the note
app.post("/api/notes", (req, res) => {
    return res.json(saveNotes(req.body));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "publick/notes.html"));
});

//home page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

getNotes();

//server to begin listening
app.listen(PORT, () => {
    console.log("The application is listening on PORT " + PORT);
});

