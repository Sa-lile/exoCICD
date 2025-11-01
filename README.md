# Projet Caisse -exoCI/CD-


## Structure du projet

- `views` :  fichiers de vues côté front-end (.ejs)
- `public` :  fichiers statiques côté front-end (css)
- `controllers` : logique métier et fonctionnalités de la caisse
- `tests` : tous les tests unitaires, fonctionnels et E2E
- `server.js` : point d’entrée du serveur Node.js avec Express
- `package.json` : configuration du projet et dépendances npm


## Initialize Node.js et Nodemon

```bash
npm init -y
npm install --save-dev nodemon
```

## Install dependencies

```bash
npm install express ejs
```

## Automatic reloading 

```bash
npm install --save-dev nodemon
```

## Start the server

```bash
npm run dev
```

## Open the browser

```bash
http://localhost:3000
```

## Run the tests

```bash
npm install --save-dev jest
npx jest
```
## Test Results 
cachController.test.js, e2e.test.js, server.test.js

```bash
 PASS  tests/cashController.test.js
 PASS  tests/server.test.js
Server is running at http://localhost:3000
 PASS  tests/e2e.test.js

Test Suites: 3 passed, 3 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.818 s, estimated 2 s
```

## Test Results - workflows 
The status of the latest CI/CD run: `ci.yml`
[![CI/CD Tests]](https://github.com/Sa-lile/exoCICD/actions/workflows/ci.yml)

The status of the latest CI/CD + minify run: `build.yml`
[![CI/CD Build & Minify]](https://github.com/Sa-lile/exoCICD/actions/workflows/build.yml)

## CI/CD build + minify workflow

```bash
chmod +x minify.sh
```

## Test Docker 

```bash
docker build -t testapp:latest .  // tag name is testapp
docker run -d -p 3000:3000 testapp::latest
```
`dockerize`run