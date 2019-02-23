const _ = require('lodash');
const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all the existing note(s)')
    .command('remove', 'remove a note with given title', {
        title: titleOptions
    })
    .command('read', 'Read a note with given title', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];


switch (command) {

    case 'list':
        const notesFound = notes.getAllNotes();
        console.log(`Printing ${notesFound.length} note(s)`);
        notesFound.forEach(note => console.log(JSON.stringify(note, null, 2)));
        break;
    case 'add':
        const noteCreated = notes.addNote(argv.title, argv.body);
        if (noteCreated) {
            console.log('________Note Created_______')
            console.log(JSON.stringify(noteCreated, null, 4));
        } else {
            console.log('________Note Already taken_______')
        }
        break;
    case 'read':
        const noteFound = notes.readNote(argv.title);
        if (noteFound) {
            console.log('________ Note found ________');
            console.log(JSON.stringify(noteFound, null, 2));
        } else {
            console.log('________ Note not found ________');
        }
        break;
    case 'remove':
        const isNodeRemoved = notes.removeNote(argv.title);
        const message = isNodeRemoved ? 'Note removed.. yupieeeeeee' : 'dammm... Note not found!';
        console.log(message);
        break;

    default:
        console.log('Command not recognized');
}