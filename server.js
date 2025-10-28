const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const { calculateChange } = require('./controllers/cashController');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
// Route views/index.ejs
app.get('/', (req, res) => {
  res.render('calculate', { error: null, result: null });
});


//Test first 
// app.get('/', (req, res) => {
//   res.send('Welcome our page!');
// });

// Route pour traiter le formulaire
app.post('/calculate', (req, res) => {
  console.log(req.body);

  const { du, donne } = req.body;

  // Vérifier que les données existent
  if (!du || !donne) {
    return res.status(400).send('Les valeurs "du" et "donne" sont requises');
  }

  // Convertir en nombres
  const montantDu = parseFloat(du);
  const montantDonne = parseFloat(donne);

  // Calculer le résultat. 
  const result = montantDonne - montantDu;
  

  // Affichage dans la console
  console.log(`du: ${montantDu}`);
  console.log(`donne: ${montantDonne}`);
  console.log(`résultat: ${result}`);

  // Rendre la vue EJS avec les données
  res.render('calculate', { du: montantDu, donne: montantDonne, result });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})