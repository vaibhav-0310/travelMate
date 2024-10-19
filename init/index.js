const mongoose = require("mongoose");
const initData = require("./data.js");
const listings = require("../models/listing.js");

const MONGO_URL = `${process.env.ATLASDB_URL}/test`;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL,{useNewUrlParser: true,
    useUnifiedTopology: true,});
}

const initDB = async () => {
  await listings.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"6707c289a686d6ab26197cd5"}));
  await listings.save(initData.data);
  console.log("data was initialized");
};

initDB();