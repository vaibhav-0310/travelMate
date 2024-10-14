const Review=require("../models/review.js");
const listing=require("../models/listing.js");

module.exports.review=async(req,res)=>{
    let Lisiting=await listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    Lisiting.reviews.push(newReview);

    await newReview.save();
    await Lisiting.save();
    req.flash("success","New Review created!!");
    res.redirect(`/listings/${Lisiting._id}`);
 };

module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!!");
    res.redirect(`/listings/${id}`);
};