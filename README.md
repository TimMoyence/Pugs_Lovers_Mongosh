# EPSI_G2_CRISTELLE_ALMODAR&\_TIM_MOYENCE_NOSQL - Projet NoSQL avec MongoDB Atlas

Ce projet consiste à créer une base de données NoSQL sur le thème des carlins en utilisant MongoDB et MongoDB Atlas. Il répond aux consignes suivantes :

- Création de deux collections principales (`pugs` et `visits`) avec des documents comportant des champs en anglais et du contenu en français.
- Réalisation de requêtes `find` complexes (avec `$gt`, `$expr`, `$regex`).
- Mise en œuvre d'opérations d'update (modification, incrémentation, ajout dans un tableau, renommage, suppression de documents).
- Création d'une troisième collection (`toys`) et implémentation d'une relation de référence entre `pugs` et `toys` (l'ID de la référence est calculé comme le nombre de lettres d'un champ).
- Affectation d'un jouet unique, choisi aléatoirement parmi les jouets non utilisés, à chaque pug.
- Création de 4 index (dont un index composé) afin d'optimiser les performances des requêtes.

## Structure du Projet

- **./data/connect.mongodb.js**  
  Module de connexion à MongoDB Atlas.

- **./queries.step2.queries.js**  
  Fonctions pour exécuter les requêtes `find` sur les collections.

- **./queries/step3.updateQueries**  
  Contient les opérations `update` (modification d'un document, incrémentation, ajout dans un tableau, renommage et suppression commentée).

- **./data/createToysCollection.js**  
  Script qui crée la collection `toys` en insérant 20 documents.  
  Chaque document possède un \_id calculé automatiquement à partir du nombre de lettres du nom du jouet.

- **./queries/step4.referredQueries.js**  
  Script qui met à jour la collection `pugs` pour assigner un jouet unique (non utilisé) à chaque pug puis réalise une agrégation avec `$lookup` pour joindre les informations du jouet.

- **./queries/step5.createIndexes.js**  
  Script de création de 4 index, dont un index composé, pour optimiser les requêtes sur les collections.

- **index.js**  
  Fichier principal qui orchestre la connexion, vérifie l'existence de la collection `pugs` et appelle les différents modules de mise à jour et d'agrégation.

## Prérequis

- Node.js (version LTS recommandée)
- NPM
- MongoDB Atlas (ou une instance MongoDB locale)
- Un fichier `.env` contenant la variable `MONGODB_URI`
- **.env.sample**  
  Un fichier **.env.sample** à la racine du projet indiquant quelles variables d'environnement configurer

- **Fichiers JSON pour l'insertion des données**  
  Les données de base pour les collections `pugs` et `visits` sont disponibles dans les fichiers suivants :

  - **/data/json/pugs.json**  
    Contient les documents d'exemple pour la collection `pugs`.

  - **/data/json/visits_veterinary.json**  
    Contient les documents d'exemple pour la collection `visits`.

## Instructions d'Exécution

1. **Installer les dépendances**  
   Dans le répertoire du projet, exécutez :

   ```bash
   npm install
   ```

2. **Insertion des données**

   - Insérez les documents de `/data/json/pugs.json` dans la collection `pugs`.
   - Insérez les documents de `/data/json/visits_veterinary.json` dans la collection `visits`.

3. **Création de la collection `toys`**  
   Exécutez le script suivant pour créer la collection `toys` avec 20 jouets rigolos :

   ```bash
   node ./data/createToysCollection.js
   ```

4. **Création des index**  
   Pour créer les index sur les collections, lancez :

   ```bash
   node ./queries/step5.createIndexes.js
   ```

5. **Mise à jour des références et agrégation**  
   Pour affecter à chaque pug un jouet unique (non utilisé) et afficher le résultat via une agrégation, exécutez :
   ```bash
   node index.js
   ```

## Remarques

- La commande de suppression dans les opérations d'update est commentée pour éviter toute suppression accidentelle.
- Le script de mise à jour des références affecte un jouet unique non utilisé à chaque pug, garantissant ainsi une attribution unique et aléatoire.
- Les index ont été créés pour optimiser les performances des requêtes fréquentes et le tri sur plusieurs champs.
- Le dump de la base est recommandé avant toute opération majeure afin de pouvoir restaurer vos données en cas de besoin.

## Propriétaires du Projet

- **Cristelle Almodar**
- **Tim Moyence**
