const $noteTitle = $(".note-title"); 
const $noteList = $(".list-container .list-group");
const $saveNote = $(".save-note");
const $newNote = $(".new-note");
const $noteContent = $(".note-textarea");

const getNotes = () => {
    return $.ajax({
        url: "/api/notes",
        method: "GET",
    });
};