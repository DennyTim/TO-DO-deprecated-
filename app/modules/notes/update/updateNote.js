const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {
  app.get('/notes/:id', async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };

    let result = null;
    try {
      result = await db.collection('to-do-list').findOne(query);
    } catch (err) {
      if (result) console.log(err);
    }
    const showData = {
      id: query._id,
      title: result.title,
      description: result.description,
    };
    res.render('updateNote', { notes: showData });
  });

  app.put('/notes/:id', async (req, res) => {
    console.log('PUT work');
    const query = { _id: ObjectId(req.params.id) };
    const newData = {
      _id: query._id,
      title: req.body.title,
      description: req.body.description,
    };
    let result = null;
    try {
      result = await db.collection('to-do-list').updateOne(query, { $set: newData }, { upsert: true });
    } catch (err) {
      console.log(err);
    }
    res.render('updateNote', { notes: newData });
  });
};
