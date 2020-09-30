import $ from 'jquery';
window.jQuery = window.$ = $;
$(selector).hide();

//Allows us to use express.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// allows express to handle parsing new data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservation Data
// =============================================================
let reservations = [
  {
    routeName: "bob",
    name: "bob",
    number: "479-409-0876",
    email: "johndoe@gmail.com",
    id: "i'm awesome"
  },
  {
    routeName: "bob's biceps",
    name: "bob",
    number: "830-494-2840",
    email: "random@gmail.com",
    id: 1200
  },
  {
    routeName: "bob3",
    name: "Bob's Triceps",
    number: "512-000-0000",
    email: "atthegym@gmail.com",
    id: 1350
  },
  {
    routeName: "bob's biceps",
    name: "bob",
    number: "830-494-2840",
    email: "random@gmail.com",
    id: 1200
  },
  {
    routeName: "bob3",
    name: "Bob's Triceps",
    number: "512-000-0000",
    email: "atthegym@gmail.com",
    id: 1350
  }
];

let waitList = [];
const {routeName, name, number, email, id} = reservations


$('#tables').append(`<div class="card-body">
<div id="stats">
  <h3><strong>Name:</strong> <span>${name}</span></h3>
  <h3><strong>Email:</strong> <span>${email}</span></h3>
  <h3><strong>Phone:</strong> <span>${phone}</span></h3>
  <h3><strong>Id:</strong> <span>${id}</span></h3>
</div>
</div>`);

$('#waitList').append(`<div class="card-body">
<div id="stats">
  <h3><strong>Name:</strong> <span>${waitList.name}</span></h3>
  <h3><strong>Email:</strong> <span>${waitList.email}</span></h3>
  <h3><strong>Phone:</strong> <span>${waitList.phone}</span></h3>
  <h3><strong>Id:</strong> <span>${waitList.id}</span></h3>
</div>
</div>`);
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitList);
});

// Displays a single reservation, or returns false
app.get("/api/reservations/:reservations", function(req, res) {
  var chosen = req.params.reservations;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});
console.log(reservations.length)

    // Create New reservations - takes in JSON input
    app.post("/api/reservations", function(req, res) {
    
        let newReservation = req.body;

        console.log(newReservation);
        
        if (reservations.length < 5){
            //add to tables
            reservations.push(newReservation);
            res.json(newReservation);
            alert("Your table is ready!");
            console.log("Your table is ready!");
        } else {
            waitList.push(newReservation);
            res.json(newReservation);
            alert("You have been added to the wait list!");
            console.log("You have been added to the wait list!");
        }
    });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


