const ObjectId = require('mongodb').ObjectId;
module.exports = (app, db) =>{
    app.get('/notes/:id', async (req, res) =>{
        const query = {_id: ObjectId(req.params.id)};

        let result = null;
        try {
            result = await db.collection('to-do-list').findOne(query);
        } catch (err) {
            console.log(err);
        }
        const showData = {
            id: query._id,
            title: result.title,
            description: result.description,
        };
        res.render('updateNote', {notes: showData});
    });

    app.delete('/notes/:id', async (req, res) => {
        console.log('delete work');
        const query = {_id: ObjectId(req.params.id)};
        console.log(query);

        let result = null;
        try {
            result = await db.collection('to-do-list').deleteOne(query);
        } catch (err) {
            console.log(err);
        }
        res.send('delete note');
        res.redirect("/");
    });
};