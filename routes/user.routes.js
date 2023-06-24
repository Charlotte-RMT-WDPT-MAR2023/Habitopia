const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const router = require("express").Router();

const { pushUps, water, yoga } = require("../models/HabitsTracker.model.js");


router.get("/habits", (req, res) => res.render("users/tracker/habits"));
router.get("/addhabit", (req, res) => res.render("users/tracker/add-habit"));
//router.get("/track", (req, res) => res.render("users/track"));
router.get("/details", (req, res) => res.render("users/tracker/details")); // changed from details to entries

 
// Habits Tracker
router.get("/pushups", (req, res) => {
  res.render("users/tracker/pushup");
});

router.get("/yoga", (req, res) => {
  res.render("users/tracker/yoga");
})

router.get("/water", (req, res) => {
  res.render("users/tracker/water")
})


//POST routes for each habit
router.post("/pushups", (req, res) => {
  const { numberOf } = req.body; 

  const newPushUps = new pushUps({ numberOf });
  newPushUps.save()
    .then(() => {
      res.redirect("/success");
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.redirect("/error"); 
    });
});


router.post("/water", (req, res) => {
  const { liters } = req.body;

  const newLiters = new water ({ liters });
  newLiters.save()
    .then(() => {
      res.redirect("/success"); 
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.redirect("/error"); 
    });
});


router.post("/yoga", (req, res) => {
  const { minutes } = req.body;

  const newMinutes = new yoga ({ minutes });
  newMinutes.save()
    .then(() => {
      res.redirect("/success"); 
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.redirect("/error"); 
    });
});


//Get previous entries for each habit

router.get('/details', async (req, res) => {
  try {
    
    const entries = await pushUps.find();
    res.render('previousEntries', { entries }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving previous entries.");
  }
});


router.get

module.exports = router;