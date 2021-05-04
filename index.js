const $noteTitle = $(".note-title"); 
const $noteList = $(".list-container .list-group");
const $saveNote = $(".save-note");
const $newNote = $(".new-note");
const $noteContent = $(".note-textarea");

let currentNote = {};

const getNotes = () => {
    return $.ajax({
        url: "/api/notes",
        method: "GET",
    });
};

const saveNotes = (note) => {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST",
    });
};

const deleteNote = (id) => {
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE",
    });
};

const getCurrentNote = () => {
    $saveNote.hide();
    if (currentNote.id) {
        $noteTitle.attr("readonly", true);
        $noteContent.attr("readonly", true);
        $noteTitle.val(currentNote.title);
        $noteContent.val(currentNote.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteContent.attr("readonly", false);
        $noteTitle.val("");
        $noteContent.val("");
    }
};