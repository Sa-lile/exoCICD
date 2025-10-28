const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true })); 

// Route views/index.ejs
app.get('/', (req, res) => {
  res.render('index', { error: null, result: null });
});


//Test first 
// app.get('/', (req, res) => {
//   res.send('Welcome our page!');
// });

// Route pour traiter le formulaire
app.post('/calculate', (req, res) => {
  const amount = parseFloat(req.body.amount);
  if (isNaN(amount) || amount < 0) {
    return res.render('index', { error: 'Please try it again.', result: null });
  }

  const result = calculateChange(amount);
  console.log('Amount received:', amount);

  // Render a separate EJS view
  res.render('calculate', { amount, result });
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});