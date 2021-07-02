//  const collection = context.services.get("cluster0").db("CovidAppData").collection("centerdetails");
// const doc = collection.findOne({ name: "mongodb" });

const exp = require("express");
const app = exp();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
app.use(exp.json());
const mc = require("mongodb").MongoClient;
app.use(exp.static(path.join(__dirname, "dist/CovidApp")));
const url = `mongodb+srv://avinash_1506:${process.env.PASSWORD}@cluster0.z51qb.mongodb.net/CovidAppData?retryWrites=true&w=majority`;
mc.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, suc) => {
    if (err) {
      console.log("Databse connection error ", err);
    } else {
      dbObj = suc.db("CovidAppData");
      app.set("dbObj", dbObj);
      app.set("statesObj", dbObj.collection("states_names"));
      app.set("userObj", dbObj.collection("userdetails"));
      app.set("districtObj", dbObj.collection("district_names"));
      app.set("vaccineObj", dbObj.collection("uservaccinedetails"));
      app.set("adminObj", dbObj.collection("admindata"));
      console.log("Database connection successful");
    }
  }
);
const user = require("./apis/users.js");
const admin = require("./apis/admin.js");
app.use("/user", user);
app.use("/admin", admin);
app.use((req, res, next) => {
  res.send({ message: "Invalid path" });
});
app.listen(process.env.PORT, () => {
  console.log("Listening on port no ", process.env.PORT);
});
