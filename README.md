# MERN-Blog

Blog (CRUD) developed by the MERN stack.

## How does it work ?

To run the project you need to install mongoDB or have an account on the website.
Then, you need to create in the server folder root, a `.env` with this config<br>

``
PORT=[choose a port]
JWT_SECRET_KEY=[choose a secret key]
JWT_EXPIRES_IN=60d
MONGO_URI=mongodb+srv://[username]:[password]@[url of the DB]?retryWrites=true&w=majority
``
### Next steps

1. Run the server with `npm install` inside the folder then `npm run start` or `npm run start:dev`
2. Run the client with `npm install` inside the folder then `npm run start` or `yarn start`
