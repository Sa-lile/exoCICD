const denominations = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05];

let caisse = {
  100: 2, 50: 5, 20: 10, 10: 10, 5: 10,
  2: 20, 1: 50, 0.5: 50, 0.2: 50, 0.1: 50, 0.05: 50
};

function calculateChange(amount) {
  if (isNaN(amount) || amount <= 0) {
    return { error: 'Montant invalide' };
  }

  let remaining = amount;
  const rendu = {};

  for (const denom of denominations) {
    if (remaining <= 0) break;

    const need = Math.floor(remaining / denom);
    const available = caisse[denom] || 0;
    const use = Math.min(need, available);

    if (use > 0) {
      caisse[denom] -= use; //reduce from register
      rendu[denom.toFixed(2)] = use;
      remaining = (remaining - use * denom).toFixed(2);
    }
  }

  if (remaining > 0) {
    return { error: `Caisse insuffisante — il manque ${remaining} €`, caisseActuelle: caisse };
  }

  return { rendu, caisseActuelle: caisse };
}

module.exports = { calculateChange, caisse };
