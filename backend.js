const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');

// route imports
const submitListingRoutes = require('./routes/submitlisting');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;
const PORT = process.env.PORT || 5000;
const app = express();

const DB_OPTIONS = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connection String
const DB = `mongodb+srv://${DB_USER}:${DB_PW}@cluster0.m6otb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// Connect to database
mongoose
  .connect(DB, DB_OPTIONS)
  .then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
  .catch((error) => console.log(error));

const publicPath = path.join(__dirname, 'build');
app.use(express.static(publicPath));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));
app.use('/submitlisting', submitListingRoutes);
