# Door2Door backend


NodeJS rest api app listen on port 5000 .
  - NodeJS
  - Mongoose
  - Socket.io

### Installation

Door2door backend requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd door2door-backend
$ yarn
$ yarn run start
```

### Api

This is the list of the exposed apis of the application.

| Method | Body |  URL 
| ------ | ------ | ------ |
| Post | /vehicles | register vehicles 
| Update | /vehicles/:id/location | update vehicles location
| Get | /vehicles/all | list of paths of vehicles stored in databas


