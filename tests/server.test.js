const request = require('supertest');
const express = require('express');
const { calculateChange } = require('../controllers/cashController');

// Fonction intermédiaire pour adapter calculateChange au test
function calculerRendu(du, donne, etatCaisse) {
  const montantARendre = donne - du;
  if (montantARendre < 0) {
    return { error: 'Le montant donné est insuffisant' };
  }
  const rendu = calculateChange(montantARendre, etatCaisse); // renvoie { '2.00': 1, '0.50': 1 } etc.
  return { rendu, etatCaisse };
}

let app;
let etatCaisse;

beforeEach(() => {
  app = express();
  app.use(express.json());

  // Etat initial de la caisse
  etatCaisse = { '2.00': 2, '1.00': 2, '0.50': 2 };

  // Route POST /calculate pour le test
  app.post('/calculate', (req, res) => {
    const { du, donne } = req.body;
    const resultat = calculerRendu(du, donne, etatCaisse);

    if (!resultat.error) {
      // Met à jour l'état de la caisse après rendu
      etatCaisse = resultat.etatCaisse;
    }

    res.json(resultat);
  });
});

describe('POST /calculate', () => {

  it('retourne le rendu correct', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ du: 2.5, donne: 5 });

    // Vérifie que le rendu est correct (clés formatées avec deux décimales)
    expect(res.body.rendu).toEqual({ '2.00': 1, '0.50': 1 });
    expect(res.body.error).toBeUndefined();
  });

  it('retourne une erreur si montant insuffisant', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ du: 10, donne: 5 });

    // Vérifie que l'erreur correspond au message attendu
    expect(res.body.error).toBe('Le montant donné est insuffisant');
  });

});
