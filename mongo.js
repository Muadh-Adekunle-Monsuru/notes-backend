const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://muadh117a:${password}@cluster0.yruggir.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose
	.connect(url)
	.then(() => {
		console.log('connection has started');
	})
	.catch((err) => console.log(err));

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
// 	content: 'And Another note is here',
// 	important: true,
// });

// note.save().then((result) => {
// console.log('note saved!');
// 	mongoose.connection.close();
// });

Note.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});
