# Piquante, site d'avis de sauce gastronomique

Projet n°6 du parcours Développeur Web d'OpenClassRooms
Une fois le projet installer, rendez-vous sur http://localhost:4200/

## Technologies

• Node.js
• Express
• MongoBD
• Mongoose

## Déploiement

1. Cloner le repository ( git clone https://github.com/Aspeckkt/P06_Geoffray_Pellerin_14102022.git )
2. Installer Node.js ( https://nodejs.org/en/ )
3. Installer Angular CLI ( npm install @angular/cli )
4. Installer Nodemon ( npm Install nodemon )
5. Installer les dépendences pour les dossiers frontend et backend ( npm install )
6. Mettre en place le fichier .env à la racine // Déjà déclarer dans app.js

````text
# MongoDB credentials
mongoose.connect(process.env.'mongodb+srv://USER:PSW@HOST/ <dbname >?retryWrites=true & w=majority' // Remplacer ou utiliser la variable d'environement (MONGO)

# Random secret token
JWT_SECRET_TOKEN = xxx
````
7. Lancer le server frontend avec 'ng serve'
8. Lancer le server backend avec 'nodemon server'
9. A vos claviers !

@Geoffray Pellerin 2022
