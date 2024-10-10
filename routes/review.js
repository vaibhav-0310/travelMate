const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const listing=require("../models/listing.js");
const {validateReview,isLoggedIn, isAuthor}=require("../middleware.js");

    //reviews route
    router.post("/",isLoggedIn,validateReview,wrapAsync( async(req,res)=>{
        let Lisiting=await listing.findById(req.params.id);
        let newReview=new Review(req.body.review);
        newReview.author=req.user._id;
        Lisiting.reviews.push(newReview);
 
        await newReview.save();
        await Lisiting.save();
        req.flash("success","New Review created!!");
        res.redirect(`/listings/${Lisiting._id}`);
     }));
     
     //review delete
     router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(async (req, res) => {
         let { id, reviewId } = req.params;
         await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
         await Review.findByIdAndDelete(reviewId);
         req.flash("success","Review deleted!!");
         res.redirect(`/listings/${id}`);
     }));
     

     module.exports=router;