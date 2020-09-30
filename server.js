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
const reservations = [
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
  }
];

let waitList = [];

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

// Displays a single character, or returns false
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

// Create New reservations - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
    if (reservations.length <= 5){
        //add to tables
        reservations.push(newReservation);
        res.json(newReservation);
    } else {
        //add to wait list
        waitList.push(newReservation);
        res.json(newReservation);
    }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

