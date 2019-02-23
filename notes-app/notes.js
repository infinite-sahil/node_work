const fileLib = require('./lib/file-lib')

var add = (title, body) => {
    var note = {
        title,
        body
    };
    var notes = fileLib.fetchNotesFromFile();
    // check if note already exist
    let duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        fileLib.saveNotes(notes);
        return note;
    }
};

var fetchAll = () => fileLib.fetchNotesFromFile();

var read = (title) => {
    const notes = fileLib.fetchNotesFromFile();
    return notes.filter((note) => note.title === title)[0];
};

var remove = (title) => {
    let notes = fileLib.fetchNotesFromFile();
    const filteredNotes = notes.filter((note) => note.title != title);
    const isNodeFound = filteredNotes.length != notes.length;
    if (isNodeFound) {
        fileLib.saveNotes(filteredNotes);
    }
    return isNodeFound;
};


module.exports = {
    addNote: add,
    getAllNotes: fetchAll,
    removeNote: remove,
    readNote: read
}

