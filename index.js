const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true,
	},
];

app.get('/', (request, response) => {
	response.send('<h1>Hello Worldy </h1>');
});
app.get('/api/notes', (request, response) => {
	response.send(notes);
});

app.get('/api/notes/:id', (request, response) => {
	const noteId = Number(request.params.id);
	const note = notes.find((val) => val.id === noteId);
	if (note) {
		response.json(note);
	} else {
		response.status(404).json('No such notes').end();
	}
});

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter((note) => note.id !== id);
	response.status(204).send(`note $(id) successfully deleted`).end();
});

// creating a new note
const generatId = () => {
	const maxId =
		notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
	return maxId + 1;
};
app.post('/api/notes', (request, response) => {
	const body = request.body;
	if (!body.content) {
		response.status(400).json({ error: 'Content is empty' });
	}
	const note = {
		content: body.content,
		important: Boolean(body.important) || false,
		id: generatId(),
	};
	notes = notes.concat(note);
	response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port  ${PORT}`);
});
