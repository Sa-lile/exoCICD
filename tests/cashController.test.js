const { calculateChange } = require('../controllers/cashController');

describe('calculateChange', () => {
  it('should calculate correct change for 77€', () => {
  const result = calculateChange(77);
  expect(result).toEqual({
    "50.00": 1,
    "20.00": 1,
    "5.00": 1,
    "2.00": 1
  });
});


  it('should return an error for negative amount', () => {
    const result = calculateChange(-5);
    expect(result).toEqual({ error: 'Montant invalide' });
  });

  it('should return an error for non-numeric input', () => {
    const result = calculateChange('abc');
    expect(result).toEqual({ error: 'Montant invalide' });
  });

  it('should return empty object for amount 0', () => {
    const result = calculateChange(0);
    expect(result).toEqual({});
  });

  it('should round and handle floating points correctly', () => {
    const result = calculateChange(3.35);
    expect(result).toEqual({
      "2.00": 1,
      "1.00": 1,
      "0.20": 1,
      "0.10": 1,
      "0.05": 1
    });
  });
});
