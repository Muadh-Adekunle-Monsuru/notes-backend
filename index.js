require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
const Note = require('./models/note');

app.get('/', (request, response) => {
	response.send('<h1>Hello Worldy </h1>');
});
app.get('/api/notes', (request, response) => {
	Note.find({}).then((notes) => response.json(notes));
});

app.get('/api/notes/:id', (request, response) => {
	Note.findById(request.params.id).then((note) => {
		response.json(note);
	});
});

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter((note) => note.id !== id);
	response.status(204).send(`note $(id) successfully deleted`).end();
});

// creating a new note

app.post('/api/notes', (request, response) => {
	const body = request.body;
	if (!body.content) {
		response.status(400).json({ error: 'Content is empty' });
	}
	const note = new Note({
		content: body.content,
		important: Boolean(body.important) || false,
	});
	note.save().then((savedNote) => {
		response.json(note);
	});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port  ${PORT}`);
});
