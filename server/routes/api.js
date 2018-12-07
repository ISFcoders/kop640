const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const readJsonFileSync = require('../config').readJsonFileSync;
const config = readJsonFileSync('configs/server.json');

const router = express.Router();

const db = `mongodb://`
    + `${ config['mongo']['username']   }:`
    + `${ config['mongo']['password']   }@`
    + `${ config['mongo']['url']        }:`
    + `${ config['mongo']['port']       }/`
    + `${ config['mongo']['dbname']     }`; // 'mongodb://<user_name>:<user_password>@<url>:<port>/<db_name>';

const User = require('../models/user');

mongoose.connect(db, err => {
    if (err) {
        console.log('Cannot connect to mongodb. ' + err);
    } else {
        console.log('Connected to mongodb');
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, `${config['token']['secretkey']}`);
    if (!payload) {
        return res.status(401).send('Unauthorized request');;
    }
    req.userId = payload.subject;
    next();
}

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
   let userData = req.body;
   let reqUser = new User(userData);
   reqUser = User.initUser(reqUser);
   console.log('user:' + reqUser);

   User.find({login: reqUser.login}, (err, user) => {
      if (err) {
          console.log(err);
      } else {
          console.log('user: ' + user);
          console.log('length: ' + Object.keys(user).length);
          if (Object.keys(user).length === 0) {
              console.log('Find no users with login: ' + reqUser.login);
              reqUser.save((error, registeredUser) => {
                  if (error) {
                      console.log(error);
                  } else {
                      console.log('Create user: ' + reqUser.login);
                      let payload = { subject: registeredUser._id };
                      let token = jwt.sign(payload, config['token']['secretkey']);
                      res.status(200).send({token});
                  }
              });
          } else {
              console.log('There is user with login ' + reqUser.login + ' in database');
              res.status(401).send('User exists');
          }
      }
   });
});

router.post('/login', (req, res) => {
   let userData = req.body;
   User.findOne({login: userData.login}, (error, user) => {
       if (error) {
           console.log(error);
       } else {
           if (!user) {
               res.status(401).send('Invalid login or password');
           } else if (user.password !== userData.password) {
               res.status(401).send('Invalid login or password');
           } else {
               let payload = { subject: user._id };
               let token = jwt.sign(payload, config['token']['secretkey']);
               res.status(200).send({
                   token,
                   login: user.login,
                   admin: user.adminstate ? "true" : "false",
                   owner: user.owner ? "true" : "false"
               });
           }
       }
   });
});

router.post('/user', (req, res) => {
    let userData = req.body;
    console.log('/api/user: login=' + userData.login);
    User.findOne({login: userData.login}, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid login');
            } else {
                res.status(200).send({
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    vallets: user.vallets,
                    userstate: user.usercheck ? 'checked' : 'uncheked'
                });
            }
        }
    });
});

router.post('/adminlist', (req, res) => {
    console.log('adminlist by owner');
    User.find({adminstate: true}, (error, users) => {
        if (error) {
            console.log(error);
        } else {
            let userMass = [];
            users.forEach(function(user) {
               userMass[userMass.length] = {
                   login: user.login,
                   role: user.adminrole,
                   phone: user.phone,
                   name: user.name,
                   email: user.email
               };
            });
            res.status(200).send({
                list: userMass
            });
        }
    })
});

router.post('/userslist', (req, res) => {
    console.log('userslist by owner');
    User.find({usercheck: true}, (error, users) => {
        if (error) {
            console.log(error);
        } else {
            let userMass = [];
            users.forEach(function(user) {
                userMass[userMass.length] = {
                    login: user.login,
                    name: user.name,
                    email: user.email
                };
            });
            res.status(200).send({
                list: userMass
            });
        }
    })
});

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo 2",
            "description": "lorem ipsum 2",
            "date": "2012-04-23T18:25:43.521Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "7",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "8",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "9",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    //console.log(events);
    res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    res.json(events);
});

module.exports = router;
