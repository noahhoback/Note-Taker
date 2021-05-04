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