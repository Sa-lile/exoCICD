const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send('Welcome my page!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});