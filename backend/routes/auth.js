const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1: Creating a user
router.post('/createuser',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password length must be atleast 8 characters').isLength({ min: 8 }),
  body('name', 'Enter a valid name').isLength({min : 2})],
   async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        let user = await User.findOne({email: req.body.email});

        if(user)
            return res.status(400).json({success: false, error: "Sorry! User with the same email already exists"});

        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass
        });

        const data = {
          user: {
            id: user.id
          }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({success: true, authToken, username: user.name});
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({success: false, error: "Internal Server Error!"});

    }
 });


//ROUTE 2: Authenticating a user
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists().isLength({ min: 8 })],
   async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try{
        let user = await User.findOne({email});

        if(!user)
            return res.status(400).json({success: false, error: "Invalid Credentials!"});

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
          return res.status(400).json({success: false, error: "Invalid Credentials!"});
        }

        const data = {
          user: {
            id: user.id
          }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({success: true, authToken, username: user.name});
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({success: false, error: "Internal Server Error!"});
    }
 });

module.exports = router;
