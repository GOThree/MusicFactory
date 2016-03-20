#Music Factory

###Run the server

- cd server and npm install
- Fix typings/main/ambient/mongoose/index.d.ts - add 

    > statics : any;

  to "Schema" class - line #160
- npm run serve.dev

###Run the client
- cd client and nom install
- npm run serve.dev

