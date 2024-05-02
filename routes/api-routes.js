const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readNotes = () => {
  const dbJson = fs.readFileSync('db/db.json', 'utf8');
  return JSON.parse(dbJson);
};

const writeNotes = (notes) => {
  fs.writeFileSync('db/db.json', JSON.stringify(notes));
};

router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
    res.json(dbJson);
  });
  
 
  router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
    const newFeedback = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
    res.json(dbJson);
  });


  router.delete('/api/notes/:id', (req, res) => {
    const dbJson = readNotes();
    const noteId = req.params.id;
    const noteIndex = dbJson.findIndex((note) => note.id === noteId);
  
    if (noteIndex !== -1) {
      dbJson.splice(noteIndex, 1);
      writeNotes(dbJson);
      res.json({ message: 'Note deleted successfully' });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  })

  module.exports = router; 