# Rad

Rad is a music server similar to spotify or a music only plex under development by the SRace team.

# Getting the server to work

1. You will need an instance of mongodb for the server to connect to. In the server folder there
is a docker-compose file which you can use to create a container for mongodb and mongo-express

2. Copy the .env.sample file to a .env file and fill in the appropriate values for your environment
3. Make sure you have all the necessary dependencies:

    `cd server && npm install`

4. Run the server in development mode using:
    
    `npm run dev`

# Using the client
1. Make sure you have all the necessary dependencies:

    `cd client && npm install`

2. Make sure you've set up the server according to the README in the root or server sub-directory
3. `npm start` Runs the app in the development mode (ensure the server is already running).
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!