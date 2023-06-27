const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const router = require("express").Router();

const { pushUps, water, yoga } = require("../models/HabitsTracker.model.js");


router.get("/habits", (req, res) => res.render("users/tracker/habits"));
router.get("/addhabit", (req, res) => res.render("users/tracker/add-habit"));
//router.get("/track", (req, res) => res.render("users/track"));
router.get("/details", (req, res) => res.render("users/tracker/details"));

 
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
      res.redirect("/entriespushup");
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
      res.redirect("/entrieswater"); 
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.redirect("/error"); 
    });
});


router.post("/yoga", (req, res) => {
  const { minutes } = req.body;

  const newMinutes = new yoga({ minutes });
  newMinutes
    .save()
    .then(() => {
      res.redirect("/entriesyoga");
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.redirect("/error");
    });
});



//Get previous entries for each habit

router.get("/entriespushup", async (req, res) => {
  try {
    const entriesPushUps = await pushUps.find().sort({ createdAt: "desc" });

    res.render("users/tracker/pushUpEntries", { entriesPushUps });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving previous entries.");
  }
});



router.get("/entrieswater", async (req, res) => {
  try {
    const entriesWater = await water.find().sort({ createdAt: "desc" });

    res.render("users/tracker/waterEntries", { entriesWater });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving previous entries.");
  }
});

router.get("/entriesyoga", async (req, res) => {
  try {
    const entriesYoga = await yoga.find().sort({ createdAt: "desc" });

    res.render("users/tracker/yogaEntries", { entriesYoga });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving previous entries.");
  }
});



module.exports = router;