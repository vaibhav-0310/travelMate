const listing=require("../models/listing.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken=process.env.MAP_TOKEN;
const baseClient = mbxgeocoding({ accessToken : maptoken });

module.exports.create = async (req, res, next) => {
    const response = await baseClient.forwardGeocode({
        query: req.body.l.location,
        limit: 1
    }).send();
    const url = req.file.path;
    const filename = req.file.filename;
    const list = new listing(req.body.l);
    list.owner = req.user._id;
    list.image = { url, filename };
    list.geometry = response.body.features[0].geometry;
    await list.save();
    req.flash("success","New Hotel added!");
    res.redirect("/listings");

};
module.exports.index=async (req,res)=>{
    const li=await listing.find({});
    res.render("listings/index.ejs",{li});
};

module.exports.new=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.show=async (req,res)=>{
    let {id}= req.params;
    const L=await listing.findById(id)
    .populate({path: "reviews", populate:{path:"author"} }).populate("owner");
    if(!L){
     
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{L});
};

module.exports.edit=async (req,res)=>{
    let{id}=req.params;
    const list=await listing.findById(id);
    if(!list){
      req.flash("error","Hotel requested doesn't exist!!");
      res.redirect("/listings");
    }
    let originalimageurl=  list.image.url;
    let o=originalimageurl.replace("/upload","/upload/h_250,w_300");
    res.render("listings/edit.ejs",{list,o});
};

module.exports.update=async(req,res)=>{
    let{id}=req.params;
    let list=await listing.findByIdAndUpdate(id,{...req.body.l});
    if(typeof req.file != "undefined"){
    let url =req.file.path;
    let filename=req.file.filename;
    list.image={url,filename};
    await list.save();}
    req.flash("success","Listing updated!!");
    res.redirect("/listings");
};

module.exports.delete=async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!!");
    res.redirect("/listings");

};

module.exports.userListings=async(req,res)=>{
    let category=req.params.category;
    const li=await listing.find({category});
    res.render("listings/index.ejs",{li});
};

module.exports.search=async(req,res)=>{
    const {query} = req.body;
    const li = await listing.find({$text: {$search: query}});
    res.render("listings/index.ejs",{li});
};
