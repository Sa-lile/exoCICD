const { calculateChange } = require('../controllers/cashController');

describe('calculateChange', () => {
  it('rend la monnaie correctement pour 77€', () => {
    const res = calculateChange(77);
    expect(res.rendu).toEqual({
      "50.00": 1,
      "20.00": 1,
      "5.00": 1,
      "2.00": 1
    });
  });
});
  it('rend la monnaie correctement pour 3.30€', () => {
    const res = calculateChange(3.30);
    expect(res.rendu).toEqual({
      "2.00": 1,
      "1.00": 1,
      "0.20": 1,
      "0.10": 1
    });
  });

  it('retourne une erreur si la caisse est insuffisante', () => {
    // Vide la caisse pour ce test
    const emptyCaisse = {
      100: 0, 50: 0, 20: 0, 10: 0, 5: 0,
      2: 0, 1: 0, 0.5: 0, 0.2: 0, 0.1: 0, 0.05: 0
    };
    const res = calculateChange(10, emptyCaisse);
  });

  it('retourne une erreur pour un montant invalide', () => {
    const res = calculateChange(-5);
    expect(res.error).toBe('Montant invalide');
  });
