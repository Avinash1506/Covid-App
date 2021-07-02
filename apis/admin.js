let exp = require("express");
let app = exp.Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
app.use(exp.json());
const verifyToken = (req, res, next) => {
  //get token from header of req object
  let tokenWithBearer = req.headers["authorization"];

  //if token is there then
  if (tokenWithBearer) {
    if (tokenWithBearer.startsWith("Bearer ")) {
      //remove first 7 characters
      let token = tokenWithBearer.slice(7, tokenWithBearer.length);
      //verify the token
      // console.log("Toekn is ", token);
      jwt.verify(token, process.env.TOKEN_SECRET_KEY_ADMIN, (err, decoded) => {
        if (err) {
          return res.send({ message: "Session Expired" });
        } else {
          next();
        }
      });
    }
  }
  //if token is not there then
  else {
    return res.send({ message: "Unauthorized access" });
  }
};
// app.post("/register", (req, res) => {});
app.post("/login", async (req, res) => {
  data = req.body;
  adminObj = req.app.get("adminObj");
  hashedPassword = await bcrypt.hash(data.password, 6);
  console.log(hashedPassword);
  console.log("data is ", data);
  let userObjFromDb = await adminObj.findOne({ username: data.Username });
  if (userObjFromDb) {
    // res.send({ message: "success" });
    isSame = await bcrypt.compare(data.password, userObjFromDb.password);
    console.log(isSame);
    if (isSame) {
      let signedtoken = await jwt.sign(
        { username: data.Username },
        process.env.TOKEN_SECRET_KEY_ADMIN
      );
      res.send({
        message: "Successful",
        jwt: signedtoken,
        userdata: data.Username,
      });
      // res.send({ message: "success" });
    } else {
      res.send({ message: "didn't match" });
    }
  } else {
    res.send({ message: "doesn't exist" });
  }
});
app.get("/getstates", async (req, res) => {
  statesObj = req.app.get("statesObj");
  states = await statesObj.findOne();
  // console.log(states["states"]);
  res.send({ message: states["states"] });
});
app.post("/getdistricts", async (req, res) => {
  state_no = +req.body.state_id;
  dbObj = req.app.get("dbObj");
  let data = await dbObj
    .collection("district_names")
    .find({ state_id: state_no })
    .toArray();
  res.send({ message: data });
});
app.post("/adddata", verifyToken, async (req, res) => {
  data = req.body;
  console.log("data is ", data);
  console.log("hello in line 77");
  dbObj = req.app.get("dbObj");
  dataFromDb = await dbObj
    .collection("centerdetails")
    .findOne({ center_id: +data["center_id"] });
  console.log("Line 83 ", dataFromDb);
  if (dataFromDb !== null) {
    res.send({ message: "Already exists" });
  } else {
    console.log("hello");
    //res.send({message:});
    slots = data["slots"];
    age_and_capacity = [];
    data["vaccine_costs"] = [];
    vaccine = [];
    console.log(
      "dose1 capacity for 18+ of covaxin ",
      data["dose1_capacity_covaxin_18+"]
    );

    data["dose1_capacity_covaxin_18+"] == undefined
      ? (data["dose1_capacity_covaxin_18+"] = 0)
      : (data["dose1_capacity_covaxin_18+"] =
          +data["dose1_capacity_covaxin_18+"]);
    data["dose1_capacity_covishield_18+"] == undefined
      ? (data["dose1_capacity_covishield_18+"] = 0)
      : (data["dose1_capacity_covishield_18+"] =
          +data["dose1_capacity_covishield_18+"]);
    data["dose1_capacity_sputnikv_18+"] == undefined
      ? (data["dose1_capacity_sputnikv_18+"] = 0)
      : (data["dose1_capacity_sputnikv_18+"] =
          +data["dose1_capacity_sputnikv_18+"]);
    data["dose1_capacity_covaxin_45+"] == undefined
      ? (data["dose1_capacity_covaxin_45+"] = 0)
      : (data["dose1_capacity_covaxin_45+"] =
          +data["dose1_capacity_covaxin_45+"]);
    data["dose1_capacity_covishield_45+"] == undefined
      ? (data["dose1_capacity_covishield_45+"] = 0)
      : (data["dose1_capacity_covishield_45+"] =
          +data["dose1_capacity_covishield_45+"]);
    data["dose1_capacity_sputnikv_45+"] == undefined
      ? (data["dose1_capacity_sputnikv_45+"] = 0)
      : (data["dose1_capacity_sputnikv_45+"] =
          +data["dose1_capacity_sputnikv_45+"]);
    // --------------------------------
    data["dose2_capacity_covaxin_18+"] == undefined
      ? (data["dose2_capacity_covaxin_18+"] = 0)
      : (data["dose2_capacity_covaxin_18+"] =
          +data["dose2_capacity_covaxin_18+"]);
    data["dose2_capacity_covishield_18+"] == undefined
      ? (data["dose2_capacity_covishield_18+"] = 0)
      : (data["dose2_capacity_covishield_18+"] =
          +data["dose2_capacity_covishield_18+"]);
    data["dose2_capacity_sputnikv_18+"] == undefined
      ? (data["dose2_capacity_sputnikv_18+"] = 0)
      : (data["dose2_capacity_sputnikv_18+"] =
          +data["dose2_capacity_sputnikv_18+"]);
    data["dose2_capacity_covaxin_45+"] == undefined
      ? (data["dose2_capacity_covaxin_45+"] = 0)
      : (data["dose2_capacity_covaxin_45+"] =
          +data["dose2_capacity_covaxin_45+"]);
    data["dose2_capacity_covishield_45+"] == undefined
      ? (data["dose2_capacity_covishield_45+"] = 0)
      : (data["dose2_capacity_covishield_45+"] =
          +data["dose2_capacity_covishield_45+"]);
    data["dose2_capacity_sputnikv_45+"] == undefined
      ? (data["dose2_capacity_sputnikv_45+"] = 0)
      : (data["dose2_capacity_sputnikv_45+"] =
          +data["dose2_capacity_sputnikv_45+"]);

    vaccine_cost_obj1 = {
      vaccine: "Covaxin",
      cost: +data["covaxin_cost"],
      dose1_capacity_18plus: data["dose1_capacity_covaxin_18+"],
      dose2_capacity_18plus: data["dose2_capacity_covaxin_18+"],
      dose1_capacity_45plus: data["dose1_capacity_covaxin_45+"],
      dose2_capacity_45plus: data["dose2_capacity_covaxin_45+"],
    };
    vaccine_cost_obj2 = {
      vaccine: "Covishield",
      cost: +data["covishield_cost"],
      dose1_capacity_18plus: data["dose1_capacity_covishield_18+"],
      dose2_capacity_18plus: data["dose2_capacity_covishield_18+"],
      dose1_capacity_45plus: data["dose1_capacity_covishield_45+"],
      dose2_capacity_45plus: data["dose2_capacity_covishield_45+"],
    };
    vaccine_cost_obj3 = {
      vaccine: "Sputnik V",
      cost: +data["sputnikv_cost"],
      dose1_capacity_18plus: data["dose1_capacity_sputnikv_18+"],
      dose2_capacity_18plus: data["dose2_capacity_sputnikv_18+"],
      dose1_capacity_45plus: data["dose1_capacity_sputnikv_45+"],
      dose2_capacity_45plus: data["dose2_capacity_sputnikv_45+"],
    };

    vaccine = [
      {
        vaccine: "Covaxin",
        dose1_capacity_18plus: data["dose1_capacity_covaxin_18+"],
        dose2_capacity_18plus: data["dose2_capacity_covaxin_18+"],
        dose1_capacity_45plus: data["dose1_capacity_covaxin_45+"],
        dose2_capacity_45plus: data["dose2_capacity_covaxin_45+"],
      },
      {
        vaccine: "Covishield",
        dose1_capacity_18plus: data["dose1_capacity_covishield_18+"],
        dose2_capacity_18plus: data["dose2_capacity_covishield_18+"],
        dose1_capacity_45plus: data["dose1_capacity_covishield_45+"],
        dose2_capacity_45plus: data["dose2_capacity_covishield_45+"],
      },
      {
        vaccine: "Sputnik V",
        dose1_capacity_18plus: data["dose1_capacity_sputnikv_18+"],
        dose2_capacity_18plus: data["dose2_capacity_sputnikv_18+"],
        dose1_capacity_45plus: data["dose1_capacity_sputnikv_45+"],
        dose2_capacity_45plus: data["dose2_capacity_sputnikv_45+"],
      },
    ];
    // if (data["covaxin"]) {
    //   let age_and_capacity = [];
    //   if (data["above18_covaxin"])
    //     age_and_capacity.push({
    //       age: 18,
    //       dose1_capacity: data["dose1_capacity_covaxin_18+"],
    //       dose2_capacity: data["dose2_capacity_covaxin_18+"],
    //     });
    //   if (data["above45_covaxin"])
    //     age_and_capacity.push({
    //       age: 45,
    //       dose1_capacity: data["dose1_capacity_covaxin_45+"],
    //       dose2_capacity: data["dose2_capacity_covaxin_45+"],
    //     });
    //   vaccine_cost_obj1["dose1_capacity_18plus"] =
    //     data["dose1_capacity_covaxin_18+"];
    //   vaccine_cost_obj1["dose2_capacity_18plus"] =
    //     data["dose2_capacity_covaxin_18+"];
    //   vaccine_cost_obj1["dose1_capacity_45plus"] =
    //     data["dose1_capacity_covaxin_45+"];
    //   vaccine_cost_obj1["dose2_capacity_45plus"] =
    //     data["dose2_capacity_covaxin_45+"];
    //   vaccine.push({ vaccine: "Covaxin", age_and_capacity: age_and_capacity });
    // }
    // if (data["covishield"]) {
    //   let age_and_capacity = [];
    //   if (data["above18_covishield"])
    //     age_and_capacity.push({
    //       age: 18,
    //       dose1_capacity: data["dose1_capacity_covishield_18+"],
    //       dose2_capacity: data["dose2_capacity_covishield_18+"],
    //     });
    //   if (data["above45_covishield"])
    //     age_and_capacity.push({
    //       age: 45,
    //       dose1_capacity: data["dose1_capacity_covishield_45+"],
    //       dose2_capacity: data["dose2_capacity_covishield_45+"],
    //     });
    //   vaccine_cost_obj2["dose1_capacity_18plus"] =
    //     data["dose1_capacity_covishield_18+"];
    //   vaccine_cost_obj2["dose2_capacity_18plus"] =
    //     data["dose2_capacity_covishield_18+"];
    //   vaccine_cost_obj2["dose1_capacity_45plus"] =
    //     data["dose1_capacity_covishield_45+"];
    //   vaccine_cost_obj2["dose2_capacity_45plus"] =
    //     data["dose2_capacity_covishield_45+"];
    //   // data['vaccine_costs'].push({cost:+data['covishield_cost'],vaccine:"Covishield",dose1_capacity:+data['dose1_capacity_covishield'],dose2_capacity:+data['dose2_capacity_covishield']});
    //   vaccine.push({
    //     vaccine: "Covishield",
    //     age_and_capacity: age_and_capacity,
    //   });
    // }
    // if (data["sputnikv"]) {
    //   let age_and_capacity = [];
    //   if (data["above18_sputnikv"])
    //     age_and_capacity.push({
    //       age: 18,
    //       dose1_capacity: data["dose1_capacity_sputnikv_18+"],
    //       dose2_capacity: data["dose2_capacity_sputnikv_18+"],
    //     });
    //   if (data["above45_sputnikv"])
    //     age_and_capacity.push({
    //       age: 45,
    //       dose1_capacity: data["dose1_capacity_sputnikv_45+"],
    //       dose2_capacity: data["dose2_capacity_sputnikv_45+"],
    //     });
    //   vaccine_cost_obj3["dose1_capacity_18plus"] =
    //     data["dose1_capacity_sputnikv_18+"];
    //   vaccine_cost_obj3["dose2_capacity_18plus"] =
    //     data["dose2_capacity_sputnikv_18+"];
    //   vaccine_cost_obj3["dose1_capacity_45plus"] =
    //     data["dose1_capacity_sputnikv_45+"];
    //   vaccine_cost_obj3["dose2_capacity_45plus"] =
    //     data["dose2_capacity_sputnikv_45+"];
    //   // data['vaccine_costs'].push({cost:+data['sputnikv_cost'],vaccine:"Sputnik V",dose1_capacity:+data['dose1_capacity_sputnikv'],dose2_capacity:+data['dose2_capacity_sputnikv']});
    //   vaccine.push({
    //     vaccine: "Sputnik V",
    //     age_and_capacity: age_and_capacity,
    //   });
    // }
    data["vaccine_costs"].push(vaccine_cost_obj1);
    data["vaccine_costs"].push(vaccine_cost_obj2);
    data["vaccine_costs"].push(vaccine_cost_obj3);
    // age = data["age"];
    delete data["above45"];
    delete data["above18"];
    delete data["fee"];
    delete data["covaxin"];
    delete data["covishield"];
    delete data["sputnikv"];
    delete data["covaxin_cost"];
    delete data["covishield_cost"];
    delete data["sputnikv_cost"];
    delete data["slots"];
    delete data["dose1_capacity_covaxin_18+"];
    delete data["dose2_capacity_covaxin_18+"];
    delete data["dose1_capacity_covaxin_45+"];
    delete data["dose2_capacity_covaxin_45+"];
    delete data["dose1_capacity_covishield_18+"];
    delete data["dose2_capacity_covishield_18+"];
    delete data["dose1_capacity_covishield_45+"];
    delete data["dose2_capacity_covishield_45+"];
    delete data["dose1_capacity_sputnikv_18+"];
    delete data["dose2_capacity_sputnikv_18+"];
    delete data["dose1_capacity_sputnikv_45+"];
    delete data["dose2_capacity_sputnikv_45+"];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    data["sessions"] = [];
    for (let i = 0; i < 7; i++) {
      let d = new Date(today);
      d.setUTCDate(d.getUTCDate() + 1);
      // console.log(d.toISOString().substr(0, 10));
      today = d.toISOString().substr(0, 10);
      date = today.slice(8, 10);
      month = today.slice(5, 7);
      year = today.slice(0, 4);
      today1 = date + "/" + month + "/" + year;
      console.log(today1);
      data["state"] = +data["state"];
      data["district_id"] = +data["district_id"];
      data["center_id"] = +data["center_id"];
      data["pincode"] = +data["pincode"];
      data["sessions"].push({
        date: today1,
        vaccine: vaccine,
        slots: slots,
      });
    }
    // console.log("Sesions", data["sessions"][0]["slots"]);
    // console.log("Data after updation is: ", data);
    console.log("Data to be inserted in db is ", data);
    let suc = await dbObj.collection("centerdetails").insertOne(data);
    res.send({ message: "Success" });
  }
});
app.post("/getcenterdetails", verifyToken, async (req, res) => {
  data = req.body.center_id;
  console.log("data is", data);
  dbObj = req.app.get("dbObj");
  dataFromDb = await dbObj
    .collection("centerdetails")
    .findOne({ center_id: +data });
  console.log("Data from db", dataFromDb);
  if (dataFromDb) {
    res.send({ message: dataFromDb });
  } else {
    res.send({ message: "Not found" });
  }
});
app.get("/getstatename", verifyToken, async (req, res) => {
  // state_id = req.body.state_id;
  dbObj = req.app.get("dbObj");
  dataFromDb = await dbObj.collection("states_names").findOne();
  console.log("data from db is ", dataFromDb);
  res.send({ message: dataFromDb });
});
app.put("/updatedata", verifyToken, async (req, res) => {
  data = req.body;
  console.log("Data in put request is: ", data);
  dbObj = req.app.get("dbObj");
  dataFromDb = await dbObj
    .collection("centerdetails")
    .findOne({ center_id: data.center_id });
  if (dataFromDb != null) {
    suc = await dbObj.collection("centerdetails").update(
      { center_id: +data.center_id },
      {
        $set: {
          vaccine_costs: data["vaccine_costs"],
          sessions: data["sessions"],
        },
      }
    );
    res.send({ message: "Success" });
  } else {
    res.send({ message: "failure" });
  }
});
app.delete("/deletedata/:center_id", verifyToken, async (req, res) => {
  data = req.params.center_id;
  console.log(data);
  dbObj = req.app.get("dbObj");
  dataFromDb = await dbObj
    .collection("centerdetails")
    .findOne({ center_id: +data });
  if (dataFromDb) {
    suc = await dbObj
      .collection("centerdetails")
      .deleteOne({ center_id: +data });
    res.send({ message: "success" });
  } else {
    res.send({ message: "failure" });
  }
});
module.exports = app;
