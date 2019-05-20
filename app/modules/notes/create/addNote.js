
module.exports = (app, db) => {
  app.get('/notes', (req, res) => {
    res.render('addNote');
  });

  app.post('/notes', async (req, res) => {
    const notes = {
      title: req.body.title,
      description: req.body.description,
    };

    let result = null;

    try {
      result = await db.collection('to-do-list').insertOne(notes);
    } catch (err) {
      console.log(err);
    }

    res.redirect('/');
  });
};
