var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require ("uid2");
var mongoose = require ("mongoose"); 

var userModel = require('../models/users');



// enregistrement des données utilisateur
router.post('/sign-up', async function(req, res, next) {

  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

  const userExists = await userModel.findOne({ email: req.body.email })
    if(userExists) {
      error.push('Email déjà utilisé');
		};

		if(req.body.name == ''
  	|| req.body.email == ''
  	|| req.body.password == ''
  	){
   		error.push('Veuillez remplir tous les champs');
  	};

		if(error.length == 0) {
			const cost = 10;
			const hash = bcrypt.hashSync(req.body.password, cost);
  		var newUser = new userModel({
				name: req.body.name,
				email: req.body.email,
				password: hash,
				token: uid2(32)
  		});

 			saveUser = await newUser.save();
			if(saveUser){
				result = true
				token = saveUser.token
    	}

  res.json({result, saveUser, error, token})
}});


// Reconnexion
router.post('/sign-in', async function(req, res, next) {

  var error = [];
  var result = false;
  var token = null;

	if(req.body.email == ''
	|| req.body.password == ''
	){
		error.push('Veuillez remplir les champs requis');
	};

	if(error.length == 0){
		const userSaved = await userModel.findOne({ email: req.body.email })
		// console.log('USER FOUND : ' + userSaved);

		if(userSaved) {
			if(bcrypt.compareSync(req.body.password, userSaved.password)) {
				token = userSaved.token
				// console.log('USER TOKEN : ' + userSaved.token);
			};
		}} else {
			error.push('Email incorrect');
		}

	res.json({result, error, token});
});


// MAJ des données utilisateur
router.put('/profile', async function(req, res, next) {
  console.log(" profile update", req.body.music);
  // console.log("interest", req.body.interest);

  const musicFromFront = JSON.parse(req.body.music)
  const interestFromFront = JSON.parse(req.body.interest)
  // console.log("name: ", req.body.name);
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

