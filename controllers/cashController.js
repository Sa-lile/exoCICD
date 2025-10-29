
//
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

// Euro bills and coins
const denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05];


function calculateChange(amount) {
  let remaining = amount;
  const result = {};

  if (isNaN(remaining) || remaining < 0) {
    return { error: 'Montant invalide' };
  }
  // Loop[500, 200, 100, 50, 20, …, 0.05]from largest to smallest
  for (const denom of denominations) {
    const count = Math.floor(remaining / denom);
    if (count > 0) {
      result[denom.toFixed(2)] = count; // ex: "50.00": 2
      remaining = (remaining - count * denom).toFixed(2);
    }
  }

  return result;
}

module.exports = { calculateChange };
