const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const multer=require("multer");
const upload= multer({dest:"uploads/"});
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const listing=require("../models/listing.js");


 //index route
 router.get("/",wrapAsync(listingController.index));

//new route
router.get("/new",isLoggedIn, listingController.new);

//show route
router.get("/:id",wrapAsync(listingController.show));

//create route
router.post("/new",validateListing,wrapAsync(listingController.create));
// router.post("/new",upload.single('listing[image]'),(req,res)=>{
//     res.send(req.body);
// });

//edit route 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.update));

//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.delete));

module.exports = router;

