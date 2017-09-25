var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/notes', (req, res) => {
    // db.collection('notes').find();
    // res.send({'error':'An error has occurred'});
    // (db.collection('notes').find());


    // db.collection('notes').find(function (err, notes) {
    //   if (err) return console.error(err);
    //   res.send(notes);
    // })

    db.collection('notes').find({});


  });

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
   const id = req.params.id;
   const details = { '_id': new ObjectID(id) };
   db.collection('notes').remove(details, (err, item) => {
     if (err) {
       res.send({'error':'An error has occurred'});
     } else {
       res.send('Note ' + id + ' deleted!');
     }
   });
  });
};
