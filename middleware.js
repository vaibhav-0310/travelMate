const listing=require("./models/listing.js");
const review=require("./models/review.js");
const ExpressError=require("./utils/ExpressError.js");
const {ListingSchema, ReviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be logged in to add hotels!!");
    return res.redirect("/login");
    }
    next();
};

module.exports.redirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let list=await listing.findById(id);
    if(!list.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","You don't have premission");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing =(req,res,next)=>{
    let {error} = ListingSchema.validate(req.body);
  if(error){
    let errormsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400 , errormsg);
  } 
  else{
    next();
  }
};

module.exports.validateReview =(req,res,next)=>{
    let {error} = ReviewSchema.validate(req.body);
  if(error){
    let errormsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400 , errormsg);
  } 
  else{
    next();
  }
};

module.exports.isAuthor=async(req,res,next)=>{
  let{id,reviewId}=req.params;
  let list=await review.findById(reviewId);
  if(!list.author._id.equals(res.locals.currUser._id)){
    req.flash("error","You don't have premission");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
