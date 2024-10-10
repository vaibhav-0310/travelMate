const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing=require("../models/listing.js");
const passport=require("passport");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");



 //index route
 router.get("/",wrapAsync(async (req,res)=>{
    const li=await listing.find({});
    res.render("./listings/index.ejs",{li});
}));

//new route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("./listings/new.ejs");
    console.log(req.user);
});

//show route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}= req.params;
    const L=await listing.findById(id).populate({path: "reviews", populate:{path:"author"} }).populate("owner");
    if(!L){
      req.flash("error","Hotel requested doesn't exist!!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{L});
}));

//create route
router.post("/new",validateListing,wrapAsync(async (req,res,next)=>{
  const list=new listing(req.body.l);
  list.owner=req.user._id;
await list.save();
req.flash("success","New Listing created!!");
res.redirect("/listings");
}));

//edit route 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const list=await listing.findById(id);
    if(!list){
      req.flash("error","Hotel requested doesn't exist!!");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list});
}));

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.l});
    req.flash("success","Listing updated!!");
    res.redirect("/listings");
}));

//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!!");
    res.redirect("/listings");
}));

module.exports = router;

