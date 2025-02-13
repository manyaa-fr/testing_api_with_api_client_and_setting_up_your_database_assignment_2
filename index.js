const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');

const app = express();
app.use(bodyParser.json());

app.post('/books', (req, res) => {
  const newBook = req.body;
  data.push(newBook);
  res.json(newBook);
});

app.get('/books', (req, res) => {
  res.json(data);
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = data.find((book) => book.book_id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Bad Request");
  }
});

app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const bookIndex = data.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    data[bookIndex] = req.body;
    res.json(data[bookIndex]);
  } else {
    res.status(404).send("Bad Request");
  }
});

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const bookIndex = data.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    data.splice(bookIndex, 1);
    res.json(data);
  } else {
    res.status(404).send("Bad Request");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
