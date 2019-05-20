const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) =>{
    app.get('/notesdel/:id', async (req, res) =>{
        const query = {_id: ObjectId(req.params.id)};

        let result = null;
        try{
            result = await db.collection('to-do-list').findOne(query);
        } catch (err) {
            console.log(err);
        }
        let showData = {
            id: query._id,
            title: result.title,
            description: result.description
        }

        res.render('updateNote', {id:showData.id, title: showData.title, description: showData.description});
        // res.send('ok');
    })

    // DELETE NOTE
    app.post('/notesdel/:id',  async (req, res)=>{
        let query = {_id: ObjectId(req.params.id)};

        let result = null;

        try {
            result = await db.collection('to-do-list').deleteOne(query);
        } catch (err) {
            console.log(err);
        }
        res.send('delete note');
    })
}