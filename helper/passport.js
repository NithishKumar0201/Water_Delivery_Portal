const LocalStrategy =require('passport-local').Strategy;
const User = require('../models/User');
const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const {hashvalidator}= require("../helper/hashing");

// passport.use(strategy, verifycallback);
module.exports=(passport)=>{
    passport.use(new LocalStrategy({usernameField:"email"},(email,password, done)=>{
        User.findOne({email:email})
        .then(user=>{
            if(!user) return done(null,false,{message:"no user"});
            if(user){
               // console.log("coming here user");
                hashvalidator(password,user.password)
                .then(result=>{
                   // console.log(result);
                    if(result) return done(null, user);
                    else {
                       
                        return done(null, false, {message:"Invalid password"});
                }});
                // .catch(err=>{
                //     console.log(err);
                // });
            }
        })
        .catch(err=>console.log(err))

    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });


};

