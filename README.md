# Dependencias

npm install cors
npm i mongoose
npm i bcryptjs
npm install dotenv
npm install body-parser
npm install uuid
npm i @sendgrid/mail
npm i jsonwebtoken

npm install ejs

# FLY.IO (CREACION)

npm install -g fly
flyctl auth login
flyctl apps create <nombre-de-tu-app>
flyctl secrets set PORT=<puerto-deseado>
flyctl deploy
flyctl open
flyctl secrets list

# Fly.io (Subir cambios y Actualizar)

flyctl auth login
flyctl deploy
fly apps restart barbershop-backend

# Variables de entorno

Para agregar variables de etorno debes agregarlas en el .env. esta funcionará en local, cuando deployes en fly.io será necesario que agregues un nuevo "secret"
