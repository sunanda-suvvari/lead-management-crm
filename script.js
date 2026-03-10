const API = "http://localhost:3000/api/leads";

/* ADD LEAD */
function addLead(){

const lead = {
name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
location: document.getElementById("location").value,
budget: document.getElementById("budget").value,
owner: document.getElementById("owner").value
};

fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(lead)
})
.then(res=>res.json())
.then(data=>{
loadLeads();
});

}


/* LOAD LEADS + DASHBOARD */
function loadLeads(){

fetch(API)
.then(res=>res.json())
.then(data=>{

const table = document.getElementById("leadTable");

table.innerHTML="";

/* Dashboard counters */

let total = data.length;
let newCount = 0;
let contacted = 0;
let visit = 0;
let closed = 0;

data.forEach(lead=>{

if(lead.status === "New") newCount++;
if(lead.status === "Contacted") contacted++;
if(lead.status === "Visit Scheduled") visit++;
if(lead.status === "Closed") closed++;

table.innerHTML += `
<tr>
<td>${lead.name}</td>
<td>${lead.phone}</td>
<td>${lead.location}</td>
<td>${lead.budget}</td>
<td>${lead.owner}</td>
<td>${lead.status}</td>

<td>
<select onchange="updateStatus(${lead.id}, this.value)">
<option value="New">New</option>
<option value="Contacted">Contacted</option>
<option value="Visit Scheduled">Visit Scheduled</option>
<option value="Closed">Closed</option>
</select>
</td>

</tr>
`;

});

/* Update dashboard */

document.getElementById("totalLeads").innerText = total;
document.getElementById("newLeads").innerText = newCount;
document.getElementById("contactedLeads").innerText = contacted;
document.getElementById("visitLeads").innerText = visit;
document.getElementById("closedLeads").innerText = closed;

});

}


/* UPDATE STATUS */
function updateStatus(id, status){

fetch(API + "/" + id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({status:status})
})
.then(res=>res.json())
.then(data=>{
loadLeads();
});

}


/* SCHEDULE VISIT */
function scheduleVisit(){

const visit = {

leadName: document.getElementById("visitLead").value,
date: document.getElementById("visitDate").value,
time: document.getElementById("visitTime").value,
property: document.getElementById("visitProperty").value

};

fetch("http://localhost:3000/api/visits",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(visit)

})
.then(res=>res.json())
.then(data=>{

alert("Visit Scheduled Successfully");

});

}


/* LOAD DATA WHEN PAGE OPENS */
loadLeads();