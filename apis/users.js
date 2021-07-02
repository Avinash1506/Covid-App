exp = require("express");
bcrypt = require("bcrypt");
app = exp.Router();
app.use(exp.json());
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
//middleware to verify the token of the req object
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
      jwt.verify(token, process.env.TOKEN_SECRET_KEY_USER, (err, decoded) => {
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
app.post("/register", async (req, res) => {
  userObj = req.app.get("userObj");
  userData = req.body;
  let userDataFromDb;
  try {
    userDataFromDb = await userObj.findOne({
      username: userData.username,
    });
  } catch (e) {
    console.log("Error in user selection ", e);
  }
  // console.log("User obj is ", userData);
  if (userDataFromDb !== null) {
    res.send({ message: "Already exists" });
  } else {
    let hashedPassword = await bcrypt.hash(userData.password, 6);
    userData.password = hashedPassword;
    delete userData.confirmpassword;
    try {
      data = await userObj.insert(userData);
    } catch (e) {
      console.log("Error in inserting data ", e);
    }
    res.send({ message: "Register Success" });
  }
});
app.post("/login", async (req, res) => {
  const userData = req.body;
  let userObj = req.app.get("userObj");
  try {
    data = await userObj.findOne({ username: userData.username });
  } catch (e) {
    console.log(e);
  }
  console.log("Data in sevrer ", data);
  if (data == null) {
    res.send({ message: "Invalid" });
  } else {
    passwordFromDatabase = data.password;
    passwordFromUser = userData.password;
    console.log(passwordFromUser);
    console.log(passwordFromDatabase);
    suc = await bcrypt.compare(passwordFromUser, passwordFromDatabase);
    if (suc) {
      let signedtoken = await jwt.sign(
        { username: data.username },
        process.env.TOKEN_SECRET_KEY_USER
      );
      res.send({
        message: "Successful",
        jwt: signedtoken,
        userdata: data.username,
      });
    } else {
      res.send({ message: "Incorrect password" });
    }
  }
});
//private router
app.post("/getDataOfCenters", verifyToken, async (req, res) => {
  district_id = +req.body.district_id;
  state_id = +req.body.state_id;
  console.log(state_id);
  dbObj = req.app.get("dbObj");
  centerDetails = await dbObj
    .collection("centerdetails")
    .find({ $and: [{ district_id: district_id }, { state: state_id }] })
    .toArray();
  console.log(centerDetails);
  res.send({ centerDetails: centerDetails });
});
//for updating date

app.get("/updateDate", async (req, res) => {
  dbObj = req.app.get("dbObj");
  datesArray = await dbObj
    .collection("centerdetails")
    .find({})
    .project({ sessions: 1 })
    .toArray();
  console.log(datesArray[0]["sessions"][0]["date"]);
  dateFromDb = datesArray[0]["sessions"][0]["date"];
  year = datesArray[0]["sessions"][0]["date"].slice(6, 10);
  console.log(year);
  let date = new Date();
  month = datesArray[0]["sessions"][0]["date"].slice(3, 5);
  fullDate = datesArray[0]["sessions"][0]["date"].slice(0, 2);
  // console.log(month);
  // console.log(fullDate);
  // console.log(date.getFullYear());
  // console.log("Month inbuilt ",date.getMonth());
  // console.log(date.getDate());
  if (
    year == date.getFullYear() &&
    month == date.getMonth() + 1 && //getMonth() returns 0 for january
    fullDate == date.getDate()
  ) {
    console.log("yes");
  } else {
    centerDetailsArray = await dbObj
      .collection("centerdetails")
      .find({})
      .toArray();
    console.log(centerDetailsArray);
    suc = await dbObj
      .collection("centerdetails")
      .updateMany(
        {},
        { $pull: { sessions: { date: dateFromDb } } },
        { multi: true }
      );
    // let today=new Date();
    let d = new Date();
    d.setUTCDate(d.getUTCDate() + 6);
    // console.log(d.toISOString().substr(0, 10));
    today = d.toISOString().substr(0, 10);
    date = today.slice(8, 10);
    month = today.slice(5, 7);
    year = today.slice(0, 4);
    today1 = date + "/" + month + "/" + year;
    for (let val of centerDetailsArray) {
      sessionsData = {
        date: today1,
        vaccine: val["sessions"][5]["vaccine"],
        slots: val["sessions"][5]["slots"],
      };
      suc = await dbObj.collection("centerdetails").updateOne(
        { center_id: val["center_id"] },
        {
          $push: {
            sessions: {
              date: today1,
              vaccine: val["sessions"][5]["vaccine"],
              slots: val["sessions"][5]["slots"],
            },
          },
        }
      );
    }
    //
  }
  res.send({ message: datesArray });
});

//-------------------
app.post("/getdata", verifyToken, async (req, res) => {
  data = req.body;
  console.log("data is ", data);
  userObj = req.app.get("userObj");
  userDataFromDb = await userObj.findOne({ username: data.username });
  res.send({ message: userDataFromDb });
});
app.get("/getworlddata", (req, res) => {
  fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.WORLD_API_KEY,
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("world data is ", data);
      res.send({ world_data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/checkvaccinedetails", verifyToken, async (req, res) => {
  obj = req.body;
  vaccineObj = req.app.get("vaccineObj");
  username = obj["username"];
  date = obj["date"];
  district_no = obj["district_no"];
  center_no = obj["center_no"];
  vaccine = obj["vaccine"];
  slot = obj["slot"];
  hospitalName = obj["hospitalName"];
  stateName = obj["stateName"];
  districtName = obj["districtName"];
  const vacObj = await vaccineObj.findOne({ username: username });
  if (vacObj) {
    // console.log("Data from vaccine db is ", data);
    if (
      Object.keys(vacObj["seconddose"]).length === 0 &&
      vacObj.constructor === Object
    ) {
      if (vacObj["firstdose"]["vaccine"] !== vaccine) {
        res.send({
          message: "Vaccines are not same",
          vaccine: vacObj["firstdose"]["vaccine"],
        });
      } else {
        dateoffirstdose = vacObj["firstdose"]["date"];
        dateofseconddose = date;
        console.log("Type of date string ", typeof dateofseconddose);
        console.log("Date in string format of first dose ", dateoffirstdose);
        console.log("Date in string format of second dose ", dateofseconddose);
        dateoffirstdose.replace("/", "-");
        dateofseconddose.replace("/", "-");
        let maindateoffirstdose = "";
        let maindateofseconddose = "";
        maindateoffirstdose += dateoffirstdose[3];
        maindateoffirstdose += dateoffirstdose[4];
        maindateoffirstdose += "/";
        maindateoffirstdose += dateoffirstdose[0];
        maindateoffirstdose += dateoffirstdose[1];
        maindateoffirstdose += "/";
        maindateoffirstdose += dateoffirstdose[6];
        maindateoffirstdose += dateoffirstdose[7];
        maindateoffirstdose += dateoffirstdose[8];
        maindateoffirstdose += dateoffirstdose[9];
        //--------------------------------------------
        maindateofseconddose += dateofseconddose[3];
        maindateofseconddose += dateofseconddose[4];
        maindateofseconddose += "/";
        maindateofseconddose += dateofseconddose[0];
        maindateofseconddose += dateofseconddose[1];
        maindateofseconddose += "/";
        maindateofseconddose += dateofseconddose[6];
        maindateofseconddose += dateofseconddose[7];
        maindateofseconddose += dateofseconddose[8];
        maindateofseconddose += dateofseconddose[9];
        console.log("Main date of first dose ", maindateoffirstdose);
        console.log("Main date of second dose ", maindateofseconddose);
        dateOfFirstDoseInDateFormat = new Date(maindateoffirstdose);
        dateOfSecondDoseInDateFormat = new Date(maindateofseconddose);
        console.log(
          "Date in string format of first dose ",
          dateOfFirstDoseInDateFormat
        );
        console.log(
          "Date in string format of second dose ",
          dateOfSecondDoseInDateFormat
        );
        timeoffirstdose = dateOfFirstDoseInDateFormat.getTime();
        timeofseconddose = dateOfSecondDoseInDateFormat.getTime();
        differenceInTime = timeofseconddose - timeoffirstdose;
        console.log("Time of first dose ", timeoffirstdose);
        console.log("Time of second dose ", timeofseconddose);
        console.log("Difference in time is ", differenceInTime);
        noOfDays = differenceInTime / (1000 * 3600 * 24);
        console.log("No of days ", noOfDays);
        if (noOfDays < 28) {
          res.send({
            message: "less no of days",
            daysRemaining: 28 - noOfDays,
          });
        } else {
          await vaccineObj.updateOne(
            { username: username },
            {
              $set: {
                seconddose: {
                  date: date,
                  district_no: district_no,
                  center_no: center_no,
                  vaccine: vaccine,
                  slot: slot,
                  center: hospitalName,
                  state: stateName,
                  district: districtName,
                },
              },
            }
          );
          res.send({ message: "first dose taken" });
        }
      }
    } else {
      // let vacObj = await vaccineObj.findOne({ mobilenumber: mobilenumber });
      res.send({ message: "Two doses are taken" });
    }
  } else {
    vaccineCollectionData = {
      username: username,
      // firstdose: true,
      // seconddose: false,
      // dateoffirstdose: date,
      // dateofseconddose: "",
      // district_no: district_no,
      // center_no: center_no,
      // vaccine: vaccine,
      // slotforfirstdose: slot,
      // slotforseconddose: "",
      firstdose: {
        date: date,
        district_no: district_no,
        center_no: center_no,
        vaccine: vaccine,
        slot: slot,
        center: hospitalName,
        state: stateName,
        district: districtName,
      },
      seconddose: {},
    };
    await vaccineObj.insertOne(vaccineCollectionData);
    res.send({ message: "No Dose Taken" });
  }
});
app.post("/vaccinedetails", verifyToken, async (req, res) => {
  username = req.body.username;
  vaccineObj = req.app.get("vaccineObj");
  console.log("Username is: ", username);
  vacObj = await vaccineObj.findOne({ username: username });
  // console.log("Vaccine object is: ", vacObj);
  firstdose = vacObj["firstdose"];
  seconddose = vacObj["seconddose"];
  res.send({ firstdose: firstdose, seconddose: seconddose });
});
//for sending state names to user in slot booking
app.get("/getstates", verifyToken, async (req, res) => {
  states = await req.app.get("statesObj");
  states_array = await states.findOne();
  res.send({ message: states_array["states"] });
});
app.post("/getdistricts", verifyToken, async (req, res) => {
  state_no = +req.body.state_id;
  districtObj = req.app.get("districtObj");
  console.log(state_no);
  district_data = await districtObj.find({ state_id: state_no }).toArray();
  console.log(district_data);
  res.send({ districts: district_data });
});
app.post("/slotbooking", verifyToken, (req, res) => {
  district_no = req.body;
  dbObj = req.app.get("dbObj");
  dbObj.collection("centerdetails").find();
});
app.post("/userVaccineData", verifyToken, async (req, res) => {
  username = req.body.username;
  dbObj = req.app.get("dbObj");
  userData = await dbObj
    .collection("uservaccinedetails")
    .findOne({ username: username });
  console.log(userData);
  res.send({ message: userData });
});
app.post("/uservaccinedatainsert", verifyToken, async (req, res) => {
  data = req.body;
  dbObj = req.app.get("dbObj");
  data["age"] = +data["age"];
  data["firstdose"] = [];
  data["seconddose"] = [];
  username = data["main_username"];
  delete data["main_username"];
  dataFromDb = await dbObj
    .collection("uservaccinedetails")
    .findOne({ username: username });
  if (dataFromDb == null) {
    mainData = {};
    mainData["username"] = username;
    mainData["users"] = [data];
    suc = await dbObj.collection("uservaccinedetails").insertOne(mainData);
    res.send({ message: "Success" });
  } else {
    suc = await dbObj
      .collection("uservaccinedetails")
      .updateOne({ username: username }, { $push: { users: data } });
    res.send({ message: "Success" });
  }
});

app.post("/getusername", verifyToken, async (req, res) => {
  data = req.body;
  dbObj = req.app.get("dbObj");
  dbObjFromDb = await dbObj
    .collection("uservaccinedetails")
    .findOne({ username: data.username });
  res.send({ username: dbObjFromDb["users"][data["no"] - 1]["username"] });
});
// app.get("/getvaccine", verifyToken, (req, res) => {
//   vaccineObj = req.app.get("vaccineObj");
//   vaccineObj
// });
module.exports = app;
