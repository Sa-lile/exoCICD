# Projet Caisse -exoCI/CD-


## Structure du projet

- `views` :  fichiers de vues côté front-end (.ejs)
- `public` :  fichiers statiques côté front-end (css)
- `controllers` : logique métier et fonctionnalités de la caisse
- `tests/` : tous les tests unitaires, fonctionnels et E2E
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

## Lancer les tests

```bash
npm install --save-dev jest
npx jest
```