const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {
	app.post(('/api/lists/:id'), async(req, res) => {
		if(req.body.item != '' || req.body.item.length > 8) {
			const query = {_id: ObjectId(req.params.id)};
			let obj = {
				listObj: {
					_id: new ObjectId(),
					itemObj: req.body.item,
					flag: false
				}
			}
			try {
				result = await db.collection('to-do-list').updateMany(query, {$addToSet: obj}, {upsert:true});
			} catch (err) {
				console.log(err);
			}
			res.send(obj.listObj);
		}
	});
};
