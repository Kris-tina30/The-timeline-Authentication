const express = require('express');

const cors = require('cors');
const router = require('./routes');
const path = require('path');
const cookieParser = require('cookie-parser');
const getEnvVar = require('./utils/getEnvVar');
const PORT = Number(getEnvVar('PORT', '2000'));

const startServer = () => {
  const app = express();
  //cookieParser
  app.use(cookieParser());
  //static files
  app.use(express.static(path.join(__dirname, '../public')));

  //ejs
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  //to submit form
  app.use(express.urlencoded({ extended: true }));

  //cors
  app.use(cors());

  //router
  app.use('/', router);

  //errors
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = startServer;
