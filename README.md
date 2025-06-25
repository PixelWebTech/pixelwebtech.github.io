# 🛠️ Outils de gestion d'Avitaillement 

## 🔎 Concept

**Avit count** est une application web conçue pour organiser, suivre et équilibrer les passages des avitailleurs lors d’un événement ou d’un exercice logistique.

Chaque participant (appelé "avitailleur") commence **en station**. Lorsqu’il part effectuer un avitaillement, son **score est incrémenté** et son **statut passe à "en piste"**. Lorsqu’il revient, un clic sur le bouton **drapeau** le remet "en station".

L’application garde un suivi clair et en temps réel de tous les avitailleurs, leur score, leur statut, l’ordre d’arrivée, et propose plusieurs outils pour la gestion de fin de quart.

---

## 🎯 Objectifs

- Suivre équitablement les passages des avitailleurs
- Visualiser rapidement les scores et statuts
- Éviter les oublis ou déséquilibres de charge
- Gérer facilement le passage d’un quart à l’autre
- Offrir une interface claire et équitable

---

## 🧑‍💻 Utilisation

### 1. 🔐 Connexion
- À l’ouverture, l’application demande un **mot de passe**.

### 2. ➕ Ajouter un avitailleur
- Saisir le **nom de l'avitailleur et numéro d'oléoserveur** et cliquer sur **"Ajouter"**.
- Il apparaît avec un **score 0** et un **statut "en station"**.
- Les avitailleurs ajoutés à la même horaire ont **la même couleur** automatiquement.

### 3. 📝 Modifier un avitailleur
- Cliquer sur l’**icône de crayon ✏️** pour **modifier le nom de l'avitailleur et numéro d'oléoserveur** d’un avitailleur.

### 4. 🗑️ Supprimer un avitailleur
- Cliquer sur l’**icône de croix ❌** pour le **retirer définitivement** de la liste.

### 5. 🏁 Démarrer un avitaillement
- Cliquer sur **"+"** → le score augmente, le statut passe à **"en piste"**.

### 6. 🚩 Retour d’un avitailleur
- Cliquer sur **le bouton drapeau** → le statut revient à **"en station"**.

### 7. ↩️ Annuler une action
- Cliquer sur le bouton **"Annuler"** pour **annuler la dernière action effectuée** (ajout, incrément, retour, suppression...).
- Permet de revenir facilement en arrière en cas d’erreur.

---

## ⚙️ Fonctions de gestion (Chef de piste)

### 🌓 Mode nuit
- L’application adopte automatiquement un **mode sombre** si l’appareil l’utilise.
- Design responsive, adapté à tous les écrans.

### 🔁 Réinitialiser les scores
- Bouton **"Remise à zéro"** : remet tous les scores à **0**, sans supprimer les avitailleurs.
- Idéal entre deux rotations dans un même quart.

### 🧹 Fin de quart
- Bouton **"Fin de quart"** : supprime **tous les avitailleurs et leurs données**.
- Permet de repartir de zéro pour un nouveau quart.

### 📤 Export CSV
- Bouton **"Exporter CSV"** : télécharge un fichier `.csv` contenant les scores, statuts et l’ordre d’ajout.
- Permet un archivage hors ligne ou un transfert administratif.





