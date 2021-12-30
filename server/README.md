# Rad

Rad is a music server similar to spotify or a music only plex under development by the SRace team.

## Getting the server to work

1. You will need an instance of `mongodb` for the server to connect to. In the server folder there
is a docker-compose file which you can use to create a container for mongodb and mongo-express

2. `ffmpeg` and `ffprobe` are required to get the duration from the audio files. Add the path to the 
executables for these in the next step

3. Copy the `.env.sample` file to a `.env` file and fill in the appropriate values for your environment
4. Make sure you have all the necessary dependencies:

    `cd server && npm install`

5. Run the server in development mode using:
    
    `npm run dev`