var express = require("express");
const passport = require("passport");
const cookie = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const app=express();
const dotenv= require('dotenv');
const flash= require('connect-flash');
const MongoStore= require('connect-mongo')(session);
const path=require('path');
//passport config
require("./helper/passport")(passport);

//config .env
dotenv.config();
//mongoose connection
const connection=mongoose.connect(process.env.DB_STRING,{useNewUrlParser:true, useUnifiedTopology:true},()=>{console.log('DB connected')});

//connect-mongo
const sessionStore = new MongoStore({
   
    url: process.env.DB_STRING,
    collection:"sessions"
});

//views
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

//body-parser
app.use(express.urlencoded({
    extended: false
}));
//express-session
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
    store: sessionStore,
    cookie:{
        maxAge: 1000*60*60*24
    }
}));
//app.use(cookie());
//flash
app.use(flash());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    console.log(req.session);
    //console.log(res.locals);
    console.log(req.user);
    next();
});

//user - middleware
app.use(async(req, res, next)=>{
   
    res.locals.currentuser=req.user;
    res.locals.error= req.flash("error");
    res.locals.info=req.flash("info");

    next();
});
//routes
app.use(require("./routes/routes"));

app.set("port", process.env.PORT || 3060);
app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})
