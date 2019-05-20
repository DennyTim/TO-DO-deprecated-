const express = require('express');
const app = express();


module.exports = (app, db) => {

	app.get('/list', async (req, res) =>{ 	// Обращение ajax, получить данные
		const items = [];
		try {
			result = await db.collection('to-do-list').find({name:"tasks"}).forEach((element) => {	//найти заметки по ключу "tasks"
                items.push(element);
            });

		} catch (err) {
			console.log(err);
		}
		res.render('list', {items});					// вернуть список axios
    });

	app.post('/lists', async (req, res) => {	// <form> ccылается на добавление
		const newitems = {
			name: "tasks",
            title: req.body.title,
            description: req.body.description,
			listObj: []
        };
		const items = [];
        let result = null;
		try {
			if (newitems.title != null || newitems.description != null) {
				result = await db.collection('to-do-list').insertOne(newitems);
				result = await db.collection('to-do-list').find({name:"tasks"}).forEach((element) => {	//найти заметки по ключу "tasks"
					items.push(element);
				});
			} else {
				return false;
			}
		} catch (err) {
			console.log(err);
		}
		let tempdata = JSON.stringify(items);
		res.send(tempdata);
    });
};
