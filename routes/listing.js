const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {isLoggedIn,isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const listing=require("../models/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload= multer({storage});


 //index route
 router.get("/",wrapAsync(listingController.index));

//new route
router.get("/new",isLoggedIn, listingController.new);

//show route
router.get("/:id",wrapAsync(listingController.show));

//create route
router.post("/new",isLoggedIn,upload.single('l[image]'),wrapAsync(listingController.create));

//edit route 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));

//update route
router.put("/:id",isLoggedIn,isOwner,upload.single('l[image]'),wrapAsync(listingController.update));

//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.delete));

router.get("/category/:category",wrapAsync(listingController.userListings));

router.post("/search",wrapAsync(listingController.search));

module.exports = router;

