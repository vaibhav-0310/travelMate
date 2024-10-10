const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {redirectUrl}=require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
   let{username, email, password}=req.body;
   const newUser=new User({email,username});
   const reg=await User.register(newUser,password);
   req.login(reg,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome to TravelMate! SignUp Successful!!");
    res.redirect("/listings");
    });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
   res.render("./users/login.ejs");
});

router.post("/login",
   redirectUrl,
   passport.authenticate("local", {
    failureRedirect: "/login", 
    failureFlash: true
  }), async (req, res) => {
    req.flash("success", "Welcome to TravelMate");
    let redirect=res.locals.redirectUrl||"/listings";

    res.redirect(redirect);
  });

router.get("/logout",(req,res)=>{
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","logged out Successfully!!");
    res.redirect("/listings");
  })
});
  

module.exports=router;