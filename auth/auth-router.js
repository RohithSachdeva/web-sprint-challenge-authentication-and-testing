const router = require('express').Router();
const bcrypt = require('bcryptjs')
const authModel = require('./authModel')
const jwt = require('jsonwebtoken')

const constants = require("../config/constants.js")

router.post('/register', (req,res) => {
  const { username, password  } = req.body
  if(!username || !password) {
      res.status(403).json({message: 'Please input a username AND password'})
  } else {
      authModel.insert({username, password: bcrypt.hashSync(password, 6)})
          .then(user => {
              res.status(200).json({message: 'You made it', username: username})
          })
          .catch(err => {
              console.log(err)
              res.status(500).json({message: 'Error'})
          })
  }

})


router.post('/login', (req,res) => {
  const { username, password } = req.body
  if(req.body) {
      authModel.findByUsername(username)
          .then(user => {
              if(user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user)
              res.status(200).json({message: 'Welcome', username: username, token})
              } else {
                res.status(400).json({message: "Invalid Credentials"})
              }
          })
          .catch(err => {
              console.log(err)
              res.status(500).json({message: 'Error'})
          })
  } else {
    res.status(400).json({ message: "Please input credentials" })
  }
})

function generateToken(user) {
  const payload = {
      username: user.username
      
  }

  const secret = constants.jwtSecret;

  const options = {
      expiresIn: '1d'
  }
  return jwt.sign(payload, secret, options)
}


module.exports = router;


//Tuesday Guided project; 

//USERNAME AND PASSWORD REQUIRED IN THIS SPRINT
//LOGIN ---> compareSync 

//MAKE signToken /// generateToken function 

// router.post("/register", (req, res) => {
//   const credentials = req.body;

//   if (isValid(credentials)) {
//       const rounds = process.env.BCRYPT_ROUNDS || 8;

//       // hash the password
//       const hash = bcryptjs.hashSync(credentials.password, rounds);

//       credentials.password = hash;

//       // save the user to the database
//       Users.add(credentials)
//           .then(user => {
//               res.status(201).json({ data: user });
//           })
//           .catch(error => {
//               res.status(500).json({ message: error.message });
//           });
//   } else {
//       res.status(400).json({
//           message:
//               "please provide username and password and the password shoud be alphanumeric",
//       });
//   }
// });