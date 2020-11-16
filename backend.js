// Built-in modules
const http = require('http');
const https = require('https');
// const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const { networkInterfaces } = require('os');

// Third Party modules
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const DB = require('./database');

// utilities
require('./util');

// getting the local ip address
const nets = networkInterfaces();
const { address } = nets['Wireless Network Connection'].find(
  ips => ips.family.toLowerCase() === 'ipv4'.toLowerCase()
);

// server port
const HTTP_PORT = 80;
const HTTPS_PORT = 443;

// server protocol
const HTTP_PROTOCOL = 'http';
const HTTPS_PROTOCOL = 'https';

// Domain name
const DNS = 'localhost';

// folder names
const STATIC = 'build';
const IMAGES = 'images';
const CREDENTIALS = 'credentials';
// files
const ROOTFILE = 'index.html';
const CERT_KEY = 'cert.key';
const CERT_FILE = 'cert.pem';

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// app module imports

// route imports
const submitListingRoutes = require('./routes/submitlisting');

const app = express();

// server build up
const SEVER_OPTIONS = {
  key: fs.readFileSync(path.join(__dirname, CREDENTIALS, CERT_KEY)),
  cert: fs.readFileSync(path.join(__dirname, CREDENTIALS, CERT_FILE)),
};

// express currently does not support http2
// const server = http2.createSecureServer(SEVER_OPTIONS, app);

// we will use https instead
const INSECURE_SERVER = http.createServer(app);
const SECURE_SERVER = https.createServer(SEVER_OPTIONS, app);

const SERVER_CONNECTION = () => {
  SECURE_SERVER.listen(HTTPS_PORT, () => {
    console.log(
      `secure connection on browser`.success,
      `                ${HTTPS_PROTOCOL}://${DNS}:${HTTPS_PORT}`.info
    );
    console.log(
      `encrypted connection on network`.disregard,
      `             ${HTTPS_PROTOCOL}://${address}:${HTTPS_PORT}`.disregard
    );
  });
  INSECURE_SERVER.listen(HTTP_PORT, () => {
    console.log(
      `insecure connection on browser`.disregard,
      `              ${HTTP_PROTOCOL}://${DNS}:${HTTP_PORT}`.disregard
    );
    console.log(
      `insecure connection on your network`.disregard,
      `         ${HTTP_PROTOCOL}://${address}:${HTTP_PORT}`.disregard
    );
  });
};

const DB_OPTIONS = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Database connection

mongoose
  .connect(DB, DB_OPTIONS)
  .then(() => {
    console.log(`sucessfully connected to database`.info);
    SERVER_CONNECTION();
  })
  .catch(error => {
    console.log(`Database error: ${error.message}`.error);
    SERVER_CONNECTION();
  });

mongoose.connection.on('disconnected', () =>
  console.log('disconnected to database'.info)
);

mongoose.connection.on('reconnected', () => {
  console.log('server successfully reconnected to database'.info);
});

app.use((req, res, next) => {
  const protocol = req.protocol;
  const host = req.headers.host;
  const reqUrl = req.url;

  if (protocol.toLowerCase() === 'http') {
    return res.redirect(`${HTTPS_PROTOCOL}://${host}:${HTTPS_PORT}`);
  }
  next();
});

const match = /\/(submitlisting|listings|featuredproperty|login)$/;
const publicPath = path.join(__dirname, STATIC);
const imagesPath = path.join(__dirname, IMAGES);
app.use(express.static(publicPath));
app.use('/images', express.static(imagesPath));

app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
    safeFileNames: true,
    preserveExtension: true,
  })
);
app.use('/submitlisting', submitListingRoutes);
app.get(match, (req, res) => res.sendFile(path.join(publicPath, ROOTFILE)));

// 404 file
app.use((req, res) => {
  console.log(`cant locatate the ${req.url}`.error);
  console.log('sending 404 response to the client');
  return res.status(404).send('File not found');
});
