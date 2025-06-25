# pixelwebtech.github.io

# 🛠️ Compteur d'Avitaillement Équitable

## 🔎 Concept AVICOUNT 

**Avitaillement Équitable** est une application web conçue pour organiser, suivre et équilibrer les passages des avitailleurs sur le terrain lors d’un événement ou d’un exercice logistique.

Chaque participant (appelé "avitailleur") commence "en station". Lorsqu’il part effectuer un avitaillement, son score est incrémenté et son statut passe à "en piste". Lorsqu’il revient, un clic sur le bouton "drapeau" le remet "en station". L’application garde un suivi clair et en temps réel de tous les avitailleurs, leur score, leur statut, et l’ordre d’arrivée.

---

## 🎯 Objectifs

- Suivre équitablement les avitaillements
- Visualiser rapidement les scores et l’ordre d’activité
- Éviter les oublis ou les déséquilibres de charge
- Favoriser une gestion juste et lisible en temps réel

---

## 🧑‍💻 Utilisation

### 1. 🔐 Connexion
À l’ouverture, l’application demande un **mot de passe** :
- Par défaut : `equitable`
- (modifiable dans `script.js` si besoin)

### 2. ➕ Ajouter un avitailleur
- Saisir le **nom et numéro de l'oléoserveur** dans le champ prévu.
- Saisir le **heure de debut de service** dans le champ prévu.
- Cliquer sur **"Ajouter"**.
- Le joueur est affiché avec un score de 0 et un statut "en station".

> Les avitailleurs ajoutés qui commence à la même horaire reçoivent automatiquement la **même couleur** pour repérer facilement les groupes d’arrivée.

### 3. 🏁 Démarrer un avitaillement
- Cliquer sur le bouton **"+"** d’un avitailleur.
- Son **score augmente de 1**, son **statut passe à "en piste"**.

### 4. 🚩 Fin d’un avitaillement
- Cliquer sur le bouton **drapeau** pour signaler que l’avitailleur est revenu en station.
- Son **statut revient à "en station"**.

### 5. 📊 Visualiser le classement
- Les avitailleurs sont triés automatiquement par **ordre des créneaux horaire**.
- Les avitailleurs sont triés automatiquement par **ordre décroissant de score**.
- Les avitailleurs sont triés automatiquement par **ordre croissant de score**.
- Un **graphique** dynamique (Chart.js) présente leur activité.

## ⚙️ Fonctions de gestion (Chef de piste)

### 🌓 Mode nuit
- Le design passe automatiquement en **mode sombre** si le navigateur ou l'appareil est en **dark mode**.
- Design responsive, adapté à tous les écrans.

### 🔁 Réinitialiser les scores
- Bouton **"Remise à zéro"** : remet tous les scores à **0** sans supprimer les avitailleurs.
- Utile entre deux missions dans un même quart.

### 🧹 Supprimer tous les avitailleurs
- Bouton **"Fin de quart"** : efface **tous les avitailleurs et leurs données**.
- Permet de repartir sur une base propre pour une nouvelle équipe ou un nouveau créneau.

### 📤 Export CSV
- Bouton **"Exporter CSV"** : télécharge un fichier `.csv` des scores et statuts.
- Permet un archivage manuel ou une exploitation hors-ligne.

---


