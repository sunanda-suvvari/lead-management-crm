const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* MongoDB Connection */

mongoose.connect("mongodb://127.0.0.1:27017/leadcrm");

console.log("MongoDB Connected");

/* Lead Schema */

const LeadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  budget: Number,
  owner: String,
  status: String
});

const Lead = mongoose.model("Lead", LeadSchema);

/* Visit Schema */

const VisitSchema = new mongoose.Schema({
  leadName: String,
  date: String,
  time: String,
  property: String
});

const Visit = mongoose.model("Visit", VisitSchema);


/* ADD LEAD */

app.post("/api/leads", async (req, res) => {

  const lead = new Lead({
    name: req.body.name,
    phone: req.body.phone,
    location: req.body.location,
    budget: req.body.budget,
    owner: req.body.owner,
    status: "New"
  });

  await lead.save();

  res.json(lead);

});


/* GET ALL LEADS */

app.get("/api/leads", async (req, res) => {

  const leads = await Lead.find();

  res.json(leads);

});


/* UPDATE LEAD STATUS */

app.put("/api/leads/:id", async (req, res) => {

  await Lead.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });

  res.json({ message: "Status Updated" });

});
app.delete("/api/leads/:id", async (req,res)=>{

await Lead.findByIdAndDelete(req.params.id);

res.json({message:"Lead deleted"});

});


/* SCHEDULE VISIT */

app.post("/api/visits", async (req, res) => {

  const visit = new Visit({
    leadName: req.body.leadName,
    date: req.body.date,
    time: req.body.time,
    property: req.body.property
  });

  await visit.save();

  res.json(visit);

});


/* GET ALL VISITS */

app.get("/api/visits", async (req, res) => {

  const visits = await Visit.find();

  res.json(visits);

});


/* START SERVER */

app.listen(3000, () => {

  console.log("Server running on port 3000");

});
