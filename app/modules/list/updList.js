const express = require('express');
const app = express();
const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {

	app.put('/api/lists/:id', async (req, res) => {
		const query = { _id: ObjectId(req.params.id) };
		const newData = {
			_id: query._id,
			title: req.body.title,
			description: req.body.description,
		};
		let result = null;
		try {
			result = await db.collection('to-do-list').updateOne(query, { $set: newData }, { upsert: true });
			result = await db.collection('to-do-list').findOne(query);
		} catch (err) {
		  console.log(err);
		}
		res.send(result);
	});
}
