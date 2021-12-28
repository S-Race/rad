# Rad

Rad is a music server similar to spotify or a music only plex under development by the SRace team.

## Getting the server to work

1. You will need an instance of mongodb for the server to connect to. In the server folder there
is a docker-compose file which you can use to create a container for mongodb and mongo-express

2. Copy the .env.sample file to a .env file and fill in the appropriate values for your environment
3. Make sure you have all the necessary dependencies:

    `cd server && npm install`

4. Run the server in development mode using:
    
    `npm run dev`