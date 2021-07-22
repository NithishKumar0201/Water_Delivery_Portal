var express = require("express");
var router = express.Router();
const User=require("../models/User");
const Order=require("../models/Orders");
const passport= require('passport');
const {hashGenerator}=require('../helper/hashing');
const {ensureUser, forwardUser, getOrders,getPost}=require("../helper/userAuth");


router.get("/",forwardUser,(req, res)=>{
    res.render("home/");
});
router.get("/home",ensureUser,getPost,(req, res)=>{
   
    res.render("home/home");
});

router.get("/about",(req, res)=>{
    res.render("home/about");
});
router.get("/login",(req, res)=>{
    res.render("home/login");
});
router.get("/signup",(req, res)=>{
    res.render("home/signup");
});
router.get("/book",ensureUser,(req, res)=>{
    res.render("home/book");
});
router.get("/profile",ensureUser, getOrders,(req, res)=>{
    res.render("home/profile");
});


//=================================================

router.post("/signup",async(req, res)=>{
  
    //res.render("home/");
    const {username, email, password, password2} =req.body;
 
    if(!username||!email||!password||!password2){
        
        req.flash("error","Please fill all fields");
        res.redirect("/signup");
    }
    if(password2!=password)
    {  req.flash("error","Re-password doesn't match");
        //console.log(req.session);
        res.redirect("/signup");
    }
   
    try{
    const user= await User.findOne({email:email});
        if(user){
            req.flash("error","Mail-ID already exists");
            res.redirect("/signup");
        }
        else{       
            const hashedPass= await hashGenerator(password);
            console.log(hashedPass);
            const newUser =await new User({
                name:username, 
                email:email, 
                password:hashedPass 
            });
            //newUser.password=hasedPassed;
            const saveuser= await newUser.save();
            req.flash("info","Your are successfully signed up. Login now!!");
            res.redirect("/login");           
        }
    }
    catch(err){
        console.log("coming here");
        res.send(err);
    }
});

// from zach video... it worked 
router.post("/login",passport.authenticate('local', { 
          successRedirect: '/',
          failureRedirect: '/login',
          failureFlash: true 
      }
  ));
//-->from Travery media video ..it also worked   
// router.post("/login",(req, res,next)=>{
//   //  console.log("coimg here");
//   //console.log(req.session);
//     passport.authenticate('local', { 
//         successRedirect: '/home',
//         failureRedirect: '/login',
//         failureFlash: true 

//     })(req,res, next);
//     //console.log(req.session+"sdfjsd");
// }

// );
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});
router.post("/book",ensureUser,(req,res, next)=>{
    var uname=req.body.name;
    var carno= req.body.carno;
    var address=req.body.address;
    var phone= (req.body.phone);
    var mailid=req.body.mailid;
    var c1=req.body.service;
    console.log(typeof c1);
    var service= c1.toString(c1);
    const ord= new Order({
        name:uname,
        citizenid:carno,
        email:mailid,
        address:address,
        phone:phone,
        orders:c1
    });
    ord.save(next);
    req.flash("info", "Your orders have been booked");
    res.redirect("/book");
});

//add post 

var Post = require("../models/post");


 router.get("/add",ensureUser, function(req, res){
   
    res.render("home/addpost");
 });

 router.post("/add", function(req, res, next){
   
    var newPost = new Post({
        title:req.body.title,
        content:req.body.content,
        userID:req.user._id
    });

    newPost.save(next);        
    res.redirect("/home");

 });



module.exports = router;