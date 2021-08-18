var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require ("uid2");
var mongoose = require ("mongoose");

var userModel = require('../models/users');

function validateEmail(email) {
  const re =
    /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// register
router.post('/signup', async function(req, res, next) {
  let error = [];
  // console.log(req.body);

  if (!validateEmail(req.body.emailFromFront)) {
    error.push("Format d'email incorrect");
  }

  // if (error.length == 0) {
  const cost = 10;
  const hash = bcrypt.hashSync(req.body.password, cost);

  var alreadyExist = await userModel.findOne({ email: req.body.email })
    if(alreadyExist){
      res.json({result:false, error})
    } else {
      var newUser = new userModel({   
      name: req.body.name,
      email: req.body.email,
      password: hash,
      token: uid2(32)
    }) 

    var userSave = await newUser.save()
  res.json({result:true, token:userSave.token});

}

// } else {
//   res.json({result:false,n});

// }

});

// router.post('/signin', async function(req, res, next) {

//   var searchUser = await userModel.findOne({
//     email: req.body.email
//   }) 
//   console.log("hi", searchUser);
//   if(bcrypt.compareSync(req.body.password, searchUser.password)){
//     res.json({result:true, token:searchUser.token})
//   } else{
//     res.json({result:false, Message: "Utilisateur non trouvé" })

//   }

// });

// MAJ des données utilisateur

router.put('/profile', async function(req, res, next) {
  console.log(" profile update", req.body.music);
  // console.log("interest", req.body.interest);

  const musicFromFront = JSON.parse(req.body.music)
  const interestFromFront = JSON.parse(req.body.interest)
  console.log("name: ", req.body.name);
  var userExist = await userModel.updateOne(
    { token: req.body.token },
    {name: req.body.name,
     age: req.body.age, 
     gender: req.body.gender,
     city: req.body.city,
     avatar: req.body.avatar,
     music: musicFromFront,
     interest: interestFromFront
    });
  

  res.json({userExist});
});

// lecture des données utilisateur
router.get('/profile', async function(req, res, next) {
// console.log('ok update', req.query)
  var updateUser = await userModel.findOne(
    { token: req.quey.token}
  );
 
  res.json({user:updateUser});
});

module.exports = router;

