const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

const router = require("express").Router();



router.get("/checkin", isLoggedIn, (req, res) => res.render("users/check-in"));
router.get("/journal", isLoggedIn, (req, res) => res.render("users/journal"));
router.get("/habits", isLoggedIn, (req, res) => res.render("users/habits"));
router.get("/addhabit", isLoggedIn, (req, res) => res.render("users/add-habit"));
router.get("/track", isLoggedIn, (req, res) => res.render("users/track"));
router.get("/details", isLoggedIn, (req, res) => res.render("users/details"));
router.get("/success", isLoggedIn, (req, res) => res.render("users/success"));

// Checkin

const Checkin = require("../models/Checkin.model");

router.post("/check-in", (req, res) => {
  const mood = req.body.scale; 

  const checkin = new Checkin({ 
    mood 
   });

  checkin.save()
    .then(() => {
      console.log("Check-in saved successfully");
      res.redirect("/success"); 
    })
    .catch((error) => {
      console.log("Error saving check-in:", error);
      res.redirect("/error"); 
    });
});

router.get("/user-profile", (req, res) => {
  Checkin.find()
    .sort({ date: -1 })
    .limit(7)
    .exec()
    .then((checkins) => {
      res.json({ checkins });
    })
    .catch((error) => {
      console.log("Error fetching check-ins:", error);
      res.redirect("/error");
    });
});



// Journal


const Journal = require("../models/Journal.model");

router.post("/journal", (req, res) => {
  const { content } = req.body;

  console.log(req.body); // Log the req.body object

  const newJournalEntry = new Journal({ content  });

  newJournalEntry.save()
    .then(() => {
      console.log("Journal entry saved successfully");
      res.redirect("/success"); 
    })
    .catch((error) => {
      console.log("Error saving journal entry:", error);
      res.redirect("/error"); 
    });
});




router.get("/journal", (req, res) => {
  console.log(req.query); // Log the query parameters to the console

  Journal.findOne()
    .sort({ createdAt: -1 })
    .exec()
    .then((previousEntry) => {
      if (previousEntry) {
        res.render("journal", { previousEntryContent: previousEntry.content, createdAt: previousEntry.createdAt });
      } else {
        res.render("journal", { previousEntryContent: null, createdAt: null });
      }
    })
    .catch((error) => {
      console.log("Error fetching previous journal entry:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});



// Habits Tracker

router.get("/habits", (req, res) => {
  Habit.find()
  .sort({ name: 1 })
  .exec()
  .then((habits) => {
    res.json({ habits });
    })
  })


  router.post('/track', (req, res) => {
    const userData = req.body.userTrackingData;
  //some more logic here to pass the info from each habit, one by one
    res.render('track.hbs');
  });




module.exports = router;
