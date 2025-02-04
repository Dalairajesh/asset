const Joi= require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User= require('./auth.model');
const JwtService = require('../service/jwt_service');
const CustomErrorHandler = require('../service/errorHandler')

const controller= {

//-------------------------- Register ----------------------------------//

  async register(req, res, next) {
        // Validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            role:  Joi.string(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
    // check if user is in the database already
    try {
        const exist = await User.exists({ email: req.body.email });
        if (exist) {
            return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
        }
    } catch(err) {
        return next(err);
    }
    const { name, email, password,role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
    });

    let access_token;
    try {
        const result = await user.save();
        console.log(result);

        // Token
        access_token = JwtService.sign({ _id: result._id, role: result.role });
        
    } catch(err) {
        return next(err);
    }
        res.status(201).json({ 
          "statusCode":201,
          "msg":"Registered successfully",
          "access_token":access_token
         });
    },

  //-------------------------- login ----------------------------------//

  async login(req, res, next) {
    // Validation
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return next(error);
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(CustomErrorHandler.wrongCredentials());
        }
        // compare the password
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return next(CustomErrorHandler.wrongCredentials());
        }
        const access_token = JwtService.sign({ _id: user._id, role: user.role });
        console.log("Successfully Login-");
        res.status(201).json({ 
          "statusCode":201,
          "msg":"Login successfully",
          "access_token":access_token
         })

    } catch(err) {
        return next(err);
    }
}
        
}
module.exports= controller;