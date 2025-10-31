const axios = require('axios');
const { spawn } = require('child_process');
const path = require('path');

let serverProcess;
const baseUrl = 'http://localhost:3000';

describe('E2E - API Caisse', () => {

  beforeAll((done) => {
    serverProcess = spawn('node', [path.join(__dirname, '../server.js')], {
      stdio: 'inherit', 
    });

    // Laisse le temps au serveur de démarrer
    setTimeout(done, 1500);
  });

  // Stoppe le serveur après les tests
  afterAll(() => {
    if (serverProcess) serverProcess.kill();
  });

  // Teste la route /etat-caisse
  it('retourne l’état de la caisse en JSON', async () => {
    const res = await axios.get(`${baseUrl}/etat-caisse`);
    expect(res.status).toBe(200);
    expect(res.data).toBeDefined();
    expect(res.data['50']).toBe(10);
    expect(typeof res.data).toBe('object');
  });

  // Teste une erreur (montant insuffisant)
  it('affiche une erreur si le montant donné est insuffisant', async () => {
    const res = await axios.post(`${baseUrl}/calculate`, {
      du: 10,
      donne: 5,
    });

    expect(res.status).toBe(200); // le serveur rend quand même la vue
    expect(res.data).toContain('Le montant donné est inférieur');
  });
});
