const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) =>{
    app.delete('/api/lists/:id', async (req, res) => {
        const query = {_id: ObjectId(req.params.id)};
        let result = null;
        try {
            result = await db.collection('to-do-list').deleteOne(query);
        } catch (err) {
            console.log(err);
        }
        res.send(res.data);
    });
};
