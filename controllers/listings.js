const listing=require("../models/listing.js");

module.exports.index=async (req,res)=>{
    const li=await listing.find({});
    res.render("./listings/index.ejs",{li});
};

module.exports.new=(req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.show=async (req,res)=>{
    let {id}= req.params;
    const L=await listing.findById(id)
    .populate({path: "reviews", populate:{path:"author"} }).populate("owner");
    if(!L){
      req.flash("error","Hotel requested doesn't exist!!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{L});
};

module.exports.create=async (req,res,next)=>{
    const list=new listing(req.body.l);
    list.owner=req.user._id;
    await list.save();
    req.flash("success","New Listing created!!");
    res.redirect("/listings");
};

module.exports.edit=async (req,res)=>{
    let{id}=req.params;
    const list=await listing.findById(id);
    if(!list){
      req.flash("error","Hotel requested doesn't exist!!");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list});
};

module.exports.update=async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.l});
    req.flash("success","Listing updated!!");
    res.redirect("/listings");
};

module.exports.delete=async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!!");
    res.redirect("/listings");
};