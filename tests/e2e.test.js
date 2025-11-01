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
    setTimeout(done, 1000);
  });
    afterAll(() => {
      if (serverProcess) serverProcess.kill();
  });

  // Tests the /etat-caisse route
  it('returns the cash register state via API', async () => {
    const res = await axios.get(`${baseUrl}/etat-caisse`);
    expect(res.status).toBe(200);
    expect(res.data).toBeDefined(); //Checks response data exists (not undefined)
    expect(res.data['50']).toBe(10); //Checks there are 10 bills of 50€ in the returned data
    expect(typeof res.data).toBe('object'); //Checks response data is an object
  });

  // Tests an error case (insufficient amount given)
  it('displays an error if the amount given is insufficient', async () => {
    const res = await axios.post(`${baseUrl}/calculate`, {
      du: 10,
      donne: 5,
    });

    expect(res.status).toBe(200); 
    expect(res.data).toContain('Le montant donné est inférieur');
  });
});
