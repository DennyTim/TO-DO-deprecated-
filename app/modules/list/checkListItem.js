const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {
	app.put(('/lists/:id'), async(req, res) => {
		const query = {_id: ObjectId(req.params.id)};
		const newData = {
			_id: query._id,
			itemObj: req.body.itemid,
			flag: req.body.flag
		};
		let arr = [];
		let result = null;
		let newresult = null;
		try {
			result = await db.collection('to-do-list').findOne(query);
			arr = (result.listObj).map(function(element){
				if(element._id == req.body.itemid) {
					element.flag = Boolean(req.body.flag);
				}
				return element;
			})
			newresult = await db.collection('to-do-list').updateOne(query, { $set: {listObj: arr}}, { upsert: true });
		} catch (err) {
			console.log(err);
		}
		res.send(newData);
	})
};
