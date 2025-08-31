    if(process.env.NODE_ENV != "production"){
        require('dotenv').config();
    }
    const express = require("express");
    const app=express();
    const mongoose=require("mongoose");
    const path=require("path");
    const methodOveride=require("method-override");
    const ejsmate=require("ejs-mate");
    const ExpressError=require("./utils/ExpressError.js");
    const session=require("express-session");
    const MongoStore=require("connect-mongo");
    const cookieParser=require("cookie-parser");
    const flash=require("connect-flash");
    const passport=require("passport");
    const localStratergy=require("passport-local");
    const User=require("./models/user.js");
    //obtaining routes
    const lisitingsrouter=require("./routes/listing.js");
    const reviewrouter=require("./routes/review.js");
    const userrouter=require("./routes/user.js"); 

    
    //middleware
    app.engine("ejs",ejsmate);
    app.use(cookieParser());
    app.use(methodOveride("_method"));
    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"views"));
    app.use(express.urlencoded({extended:true}));
    app.use(express.static(path.join(__dirname,"/public")));
    
    const dburl="mongodb://127.0.0.1:27017/travelmate";
    const store=MongoStore.create({
        mongoUrl:dburl,
        crypto:{
            secret:process.env.SECRET
        },
        touchAfter:24*3600
    });
    
    store.on("error",(err)=>{
        console.log("Error in Mongo Session Store",err);
    });

    
    //creating session
    app.use(session({store,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        }}));
    app.use(flash());

    //implementing passport
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStratergy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

      

    //database connection
    
    async function main(){
        await mongoose.connect(dburl);
    };
    main()
    .then(()=>{
        console.log("connection success");
    })
    .catch((err)=>{
        console.log(err);
    });
 
  //local variables
  app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    console.log(req.user);
    next();
});
    

    //listing route
    app.use("/listings",lisitingsrouter);
    //review route
    app.use("/listings/:id/review",reviewrouter);
    //user route
    app.use("/",userrouter);

     
    app.get("/",(req,res)=>{
        res.render("listings/home.ejs");
    });


    //listening port
    app.listen(8080,()=>{
        console.log("server started");
    });


    //error handling for wrong route
    app.all("*", (req,res,next)=>{
        next( new ExpressError(404,"Page Not Found!!"));
    });

    //error handling midddleware
    app.use((err,req,res,next)=>{
        let{statusCode=500,message="Something went wrong"}=err;
        res.status(statusCode).render("./listings/error.ejs",{err});
    });