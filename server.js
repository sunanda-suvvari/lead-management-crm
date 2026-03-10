const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* Temporary database */

let leads = [];
let visits = [];


/* ADD LEAD */

app.post("/api/leads", (req, res) => {

const lead = {

id: leads.length + 1,
name: req.body.name,
phone: req.body.phone,
location: req.body.location,
budget: req.body.budget,
owner: req.body.owner,
status: "New"

};

leads.push(lead);

res.json(lead);

});


/* GET ALL LEADS */

app.get("/api/leads", (req, res) => {

res.json(leads);

});


/* UPDATE LEAD STATUS */

app.put("/api/leads/:id", (req, res) => {

const id = parseInt(req.params.id);

const lead = leads.find(l => l.id === id);

if(lead){

lead.status = req.body.status;

res.json(lead);

}
else{

res.status(404).send("Lead not found");

}

});


/* SCHEDULE VISIT */

app.post("/api/visits", (req, res) => {

const visit = {

id: visits.length + 1,
leadName: req.body.leadName,
date: req.body.date,
time: req.body.time,
property: req.body.property

};

visits.push(visit);

res.json(visit);

});


/* GET ALL VISITS (optional but useful) */

app.get("/api/visits", (req, res) => {

res.json(visits);

});


/* START SERVER */

app.listen(3000, () => {

console.log("Server running on port 3000");

});