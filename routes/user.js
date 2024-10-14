const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {redirectUrl}=require("../middleware.js");
const userController= require("../controllers/user.js");

router.get("/signup",userController.form);

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",userController.loginForm);

router.post("/login",
   redirectUrl,
   passport.authenticate("local", {
    failureRedirect: "/login", 
    failureFlash: true
  }), userController.login);

router.get("/logout",userController.logout);
  

module.exports=router;