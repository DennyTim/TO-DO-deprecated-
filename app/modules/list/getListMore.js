const express = require('express');
const app = express();
const ObjectId = require('mongodb').ObjectId;


module.exports = (app, db) => {
	app.get('/lists/:id', async (req, res) =>{
		const query = {_id: ObjectId(req.params.id)};
        let result = null;
        try {
			result = await db.collection('to-do-list').findOne(query);
			console.log(result);
        } catch (err) {
            console.log(err);
        }

		const showData = {
			id: query._id,
			title: result.title,
			description: result.description,
			listObj: result.listObj
		};

		res.render('list-more',  {lists: showData});
	});
};
