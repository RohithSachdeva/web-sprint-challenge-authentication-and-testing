const axios = require('axios');
const router = require('express').Router();
const checkToken = require('../auth/authenticate-middleware.js');

router.get('/', checkToken, (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

module.exports = router;


//guided project brings in middleware for router

// const restricted = require("../auth/restricted-middleware.js");

// router.get("/", restricted, (req, res) => {
//     Users.find()
//         .then(users => {
//             res.status(200).json({ data: users });
//         })
//         .catch(err => res.send(err));
// });