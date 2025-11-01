const request = require('supertest');
const express = require('express');
const { calculateChange } = require('../controllers/cashController');

let app;
let etatCaisse;

beforeEach(() => {
  app = express();
  app.use(express.json());

  etatCaisse = {
    '50': 1,
    '20': 2,
    '5': 5,
    '2.00': 10,
    '1.00': 10,
    '0.50': 10
  };

  app.post('/calculate', (req, res) => {
    const { du, donne } = req.body;
    const montantARendre = donne - du;

    if (montantARendre < 0) {
      return res.json({ error: 'Le montant donné est insuffisant' });
    }

    const { rendu, caisseActuelle, error } = calculateChange(montantARendre, { ...etatCaisse });

    if (!error) etatCaisse = caisseActuelle;

    res.json({ rendu, error });
  });
});

describe('POST /calculate', () => {
  it('retourne le rendu correct', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ du: 2.5, donne: 5 });

    // Vérifie que le rendu est correct
    expect(res.body.rendu).toEqual({ '2.00': 1, '0.50': 1 });
    expect(res.body.error).toBeUndefined();
  });

  it('retourne une erreur si montant insuffisant', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ du: 10, donne: 5 });

    expect(res.body.error).toBe('Le montant donné est insuffisant');
  });
});
