const fs = require('fs')

var notesFile = './playground/notes-data.json';

var fetchNotesFromFile = () => {
    try {
        return JSON.parse(fs.readFileSync(notesFile));
    } catch (e) {
        console.log("File not present, will be creating new one");
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
}


module.exports = {
    fetchNotesFromFile,
    saveNotes
}