const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { calculateChange, caisse} = require('./controllers/cashController');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const etatCaisse = {
  '100': 5,
  '50': 10,
  '20': 10,
  '10': 10,
  '5': 10,
  '2': 20,
  '1': 20,
  '0.50': 20,
  '0.20': 20,
  '0.10': 20,
  '0.05': 20
};
// utiliser pour tester
app.get('/etat-caisse', (req, res) => {
  res.json(etatCaisse);
});

// Route views/calculate.ejs
app.get('/', (req, res) => {
  res.render('calculate', { 
    error: null, 
    result: null, 
    du: null, 
    donne: null, 
    rendu: null, 
    etatCaisse: caisse
  });
});



// Route pour traiter le formulaire
app.post('/calculate', (req, res) => {
  try {
    console.log(req.body);
    const { du, donne} = req.body;

    // Vérifier que les données existent
    if (!du || !donne) {
      return res.status(400).send('Les valeurs "du" et "donne" sont requises');
    }

    // Convertir en nombres
    const montantDu = parseFloat(du);
    const montantDonne = parseFloat(donne);

    if (isNaN(montantDu) || isNaN(montantDonne)) {
      return res.status(400).json({ error: 'Veuillez entrer des montants valides' });
    }

    if (montantDonne < montantDu) {
      return res.render('calculate', { error: 'Le montant donné est inférieur au montant dû', du: montantDu, donne: montantDonne, result: null, rendu: null });
    }

    // Calcul du rendu
    const montantARendre = montantDonne - montantDu;
    const rendu = calculateChange(montantARendre);

    if (rendu && rendu.error) {
      return res.render('calculate', { 
        error: rendu.error, 
        du: montantDu, 
        donne: montantDonne, 
        result: montantARendre, 
        rendu,
        etatCaisse
      });
    }
    const { caisseActuelle } = rendu;
    // Affichage dans la console
    console.log(`du: ${montantDu}`);
    console.log(`donne: ${montantDonne}`);
    console.log(`montantARendre: ${montantARendre.toFixed(2)}`);
    console.log('Rendu:', rendu);

    // Rendre la vue avec les données
    res.render('calculate', {
      error: null,
      du: montantDu,
      donne: montantDonne,
      result: montantARendre,
      rendu: rendu.rendu,
      etatCaisse: caisseActuelle
    });
  
  } catch (err) {
    console.error('POST /calculate error:', err);
    if (!res.headersSent) {
      return res.status(500).render('calculate', { error: 'Erreur serveur', du: req.body.du, donne: req.body.donne, result: null, rendu: null, etatCaisse });
    }
  }
});
//const etatCaisse = { "10": 2, "5": 4, "2": 10 };
//Object.keys(etatCaisse); // ["10", "5", "2"]
if (etatCaisse && typeof etatCaisse === 'object') {
  const valeurs = Object.keys(etatCaisse)
    .map(parseFloat)
    .sort((a, b) => b - a);

} else {
  console.warn('Attention : etatCaisse est introuvable ou invalide.');
}


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})