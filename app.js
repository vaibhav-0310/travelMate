const express = require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodOveride=require("method-override");
const ejsmate=require("ejs-mate");

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

//listening port
app.listen(8080,()=>{
    console.log("server started");
});

//apis
app.get("/",(req,res)=>{
    res.send("done");
});

//index route
app.get("/listings",async (req,res)=>{
    const li=await listing.find({});
    res.render("./listings/index.ejs",{li});
});

//new route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id}= req.params;
    const L=await listing.findById(id);
    res.render("listings/show.ejs",{L});
});

//create route
app.post("/listings/new",async (req,res)=>{
   const list=new listing(req.body.l);
   await list.save();
   res.redirect("/listings");
});

app.get("/listings/:id/edit",async (req,res)=>{
    let{id}=req.params;
    const list=await listing.findById(id);
    res.render("listings/edit.ejs",{list});
});

app.put("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.l});
    res.redirect("/listings");
});

app.delete("/listing/:id",async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
});