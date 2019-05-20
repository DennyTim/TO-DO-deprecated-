const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const path = require('path');

let app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './app/templates/');
app.set('view engine', 'pug');

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, client) => {
	if (err) return console.log(err);

	const database = client.db(db.dbName);
	require('./routes/routes.js')(app, database);

	app.listen(8000, () => {
		console.log('Connected to ' + db.url);
		console.log('We are live on http://localhost:8000');
	});
})
