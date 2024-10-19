const User=require("../models/user");

module.exports.form=(req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
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
};

module.exports.loginForm=(req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.login=async (req, res) => {
    req.flash("success", "Welcome to TravelMate");
    let redirect=res.locals.redirectUrl||"/listings";
    res.redirect(redirect);
};

module.exports.logout=(req,res)=>{
    req.logOut((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","logged out Successfully!!");
      res.redirect("/listings");
    })
  };