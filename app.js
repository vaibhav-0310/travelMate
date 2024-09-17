    const express = require("express");
    const app=express();
    const mongoose=require("mongoose");
    const listing=require("./models/listing.js");
    const path=require("path");
    const methodOveride=require("method-override");
    const ejsmate=require("ejs-mate");
    const wrapAsync=require("./utils/wrapAsync.js");
    const ExpressError=require("./utils/ExpressError.js");
    const {ListingSchema, ReviewSchema}=require("./schema.js");
    const Review=require("./models/review.js");

    app.engine("ejs",ejsmate);
    app.use(methodOveride("_method"));
    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"views"));
    app.use(express.urlencoded({extended:true}));
    app.use(express.static(path.join(__dirname,"/public")));

    //database connection
    async function main(){
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    };
    main()
    .then(()=>{
        console.log("connection success");
    })
    .catch((err)=>{
        console.log(err);
    });

    const validateListing =(req,res,next)=>{
        let {error} = ListingSchema.validate(req.body);
      if(error){
        let errormsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400 , errormsg);
      } 
      else{
        next();
      }
    };

    const validateReview =(req,res,next)=>{
        let {error} = ReviewSchema.validate(req.body);
      if(error){
        let errormsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400 , errormsg);
      } 
      else{
        next();
      }
    };

    //listening port
    app.listen(8080,()=>{
        console.log("server started");
    });

    //index route
    app.get("/listings",wrapAsync(async (req,res)=>{
        const li=await listing.find({});
        res.render("./listings/index.ejs",{li});
    }));

    //new route
    app.get("/listings/new",(req,res)=>{
        res.render("./listings/new.ejs");
    });

    //show route
    app.get("/listings/:id",wrapAsync(async (req,res)=>{
        let {id}= req.params;
        const L=await listing.findById(id).populate("reviews");
        res.render("listings/show.ejs",{L});
    }));

    //create route
    app.post("/listings/new",validateListing,wrapAsync(async (req,res,next)=>{
      const list=new listing(req.body.l);
    await list.save();
    res.redirect("/listings");
    }));

    //edit route 
    app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
        let{id}=req.params;
        const list=await listing.findById(id);
        res.render("listings/edit.ejs",{list});
    }));

    //update route
    app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
        let{id}=req.params;
        await listing.findByIdAndUpdate(id,{...req.body.l});
        res.redirect("/listings");
    }));

    //delete route
    app.delete("/listing/:id",wrapAsync(async(req,res)=>{
        let{id}=req.params;
        await listing.findByIdAndDelete(id);
        res.redirect("/listings");
    }));


    //reviews route
    app.post("/listings/:id/review",validateReview,wrapAsync( async(req,res)=>{
       let Lisiting=await listing.findById(req.params.id);
       let newReview=new Review(req.body.review);

       Lisiting.reviews.push(newReview);

       await newReview.save();
       await Lisiting.save();
       res.redirect(`/listings/${Lisiting._id}`);
    }));
    
    //review delete
    app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
        let { id, reviewId } = req.params;
        await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/listings/${id}`);
    }));
    

    //error handling for wrong route
    app.all("*", (req,res,next)=>{
        next( new ExpressError(404,"Page Not Found!!"));
    });

    //error handling midddleware
    app.use((err,req,res,next)=>{
        let{statusCode=500,message="Something went wrong"}=err;
        res.status(statusCode).render("listings/error.ejs",{err});
        // res.status(statusCode).send(message);
    });