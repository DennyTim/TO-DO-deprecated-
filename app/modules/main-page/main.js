module.exports = (app, db) => {
  app.get('/', async (req, res) => {
    let result = null;
    const notes = [];

    try {
      result = await db.collection('to-do-list').find().forEach((element) => {
        notes.push(element);
      });
    } catch (err) {
      console.log(err);
    }
    res.render('main-page', {notes});
  });
};
