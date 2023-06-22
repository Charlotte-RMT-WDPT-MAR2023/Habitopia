
const router = require("express").Router();

router.get("/checkin", (req, res) => res.render("users/check-in"));
router.get("/journal", (req, res) => res.render("users/journal"));
router.get("/habits", (req, res) => res.render("users/habits"));
router.get("/addhabit", (req, res) => res.render("users/add-habit"));
router.get("/track", (req, res) => res.render("users/track"));
router.get("/details", (req, res) => res.render("users/details"));
router.get("/success", (req, res) => res.render("users/success"));

// Checkin

const Checkin = require("../models/Checkin.model");

router.post("/check-in", (req, res) => {
  const mood = req.body.scale; 
  //const userId = req.user._id;

  const checkin = new Checkin({ 
    mood
   // user: userId, 
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

module.exports = router;

// Journal


const Journal = require("../models/Journal.model");

router.post("/journal", (req, res) => {
  const { content } = req.body;

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
  // Find the most recent journal entry
  Journal.findOne()
    .sort({ createdAt: -1 }) 
    .exec()
    .then((previousEntry) => {
      if (previousEntry) {
        res.json({ previousEntryContent: previousEntry.content, createdAt: previousEntry.createdAt });
      } else {
        res.json({ previousEntryContent: null, createdAt: null });
      }
    })
    .catch((error) => {
      console.log("Error fetching previous journal entry:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});




module.exports = router;