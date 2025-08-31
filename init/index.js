const mongoose = require("mongoose");
const initData = require("./data.js");
const listings = require("../models/listing.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1/travelmate");
}

const initDB = async () => {
  await listings.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"6707c289a686d6ab26197cd5"}));
  await listings.insertMany(initData.data);
  console.log("data was initialized" );
};

initDB();