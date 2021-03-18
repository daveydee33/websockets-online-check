Try it out - https://websockets-online-check.herokuapp.com/

Note: This app [websockets-online-check](https://github.com/daveydee33/websockets-online-check) is using WebSockets directly.  For an improved version of this, see my other one [socketio-online-check](https://github.com/daveydee33/socketio-online-check) which instead uses SocketIO which has some advantages such as handling automatic reconnect with WebSockets.
## How to use

1. Install dependencies, and Start the dev server

   ```
   npm install
   npm run dev
   ```

2. Open the client app in your browser

   ```
   open http://localhost:8080
   ```


## TODO

- Implement Secure - WSS and HTTPS
- Handle when Server Offline, or Restart when connection dies
  - Might switch to use Socket.io
- Add button controls for Interval and Start/Stop
