const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const DB = require('./database');

// utilities
require('./util');

// route imports
const submitListingRoutes = require('./routes/submitlisting');
// const routes = require('./routes');
// console.log(routes.submitlisting());

const PORT = process.env.PORT || 5000;
const app = express();

const DB_OPTIONS = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to database
mongoose
  .connect(DB, DB_OPTIONS)
  .then(a => {
    console.log(`sucessfully connected to database`.info);
    app.listen(PORT, () => console.log(`server running on ${PORT}`.success));
  })
  .catch(error => {
    console.log(`Database error: ${error.message}`.error);
    app.listen(PORT, () => console.info(`server running on ${PORT}`.success));
  });

mongoose.connection.on('disconnected', () =>
  console.log('disconnected to database'.info)
);

// app.use((req, res, next) => {
//   console.log('receive request'.info);
//   console.log(req.headers);
//   next();
// });

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));
// app.use('/submitlisting', routes.submitlisting);
app.use('/submitlisting', submitListingRoutes);
