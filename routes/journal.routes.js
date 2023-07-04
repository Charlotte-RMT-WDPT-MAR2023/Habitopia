const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const router = require("express").Router();

router.get("/success", isLoggedIn, (req, res) => res.render("users/success"));
router.get("/test", (req, res, next) => {res.render("users/test");
});


// Checkin

const Checkin = require("../models/Checkin.model");

router.get("/checkin", isLoggedIn, (req, res) =>
  res.render("users/check-in/check-in")
);


router.post("/check-in", isLoggedIn, (req, res) => {
  const mood = req.body.scale;
  const userId = req.session.currentUser._id; 

  const checkin = new Checkin({
    mood,
    user: userId 
  });

  const successMessage = "Check-in saved successfully";

  checkin
    .save()
    .then(() => {
      console.log("Check-in saved successfully");
      res.render("users/check-in/check-in-success", { successMessage });
    })
    .catch((error) => {
      console.log("Error saving check-in:", error);
      res.redirect("/error");
    });
});



router.get("/user-profile", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id; 

  Checkin.find({ user: userId }) 
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
// Save

const Journal = require("../models/Journal.model");

router.post("/journal", isLoggedIn, (req, res) => {
  const { content } = req.body;
  const userId = req.session.currentUser._id; 

  const newJournalEntry = new Journal({ content, user: userId });

  const successMessage = "Journal entry saved successfully";

  newJournalEntry
    .save()
    .then(() => {
      console.log(successMessage);
      res.render("users/journal/journal-success", { successMessage });
    })
    .catch((error) => {
      console.log("Error saving journal entry:", error);
      res.redirect("/error");
    });
});


// show last
router.get("/journal", isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.currentUser._id;

    const currentEntryCreatedAt = new Date();

    const previousEntry = await Journal.findOne({
      user: userId,
      createdAt: { $lt: currentEntryCreatedAt },
    })
      .sort({ createdAt: -1 })
      .exec();

    if (!previousEntry) {
      console.log("No previous entry found.");
      const today = new Date();
      const options = {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return res.render("users/journal/journal", {
        createdAt: today.toLocaleDateString("en-US", options),
        content: "Nothing to see here",
      });
    }

    const today = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return res.render("users/journal/journal", {
      createdAt: new Date(previousEntry.createdAt).toLocaleDateString(
        "en-US",
        options
      ),
      content: previousEntry.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .send("An error occurred while retrieving the previous entry.");
  }
});


// list all
router.get("/journallist", isLoggedIn, (req, res, next) => {
  const userId = req.session.currentUser._id;

  Journal.find({ user: userId })
    .sort({ createdAt: -1 })
    .then((userJournalsFromDB) => {
      res.render("users/journal/journal-list", { journals: userJournalsFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the journals from the DB: ", error);
      res
        .status(500)
        .send("An error occurred while retrieving the journal entries.");
    });
});


//details

router.get("/journal/:journalId", isLoggedIn, (req, res) => {
  const { journalId } = req.params;
  const userId = req.session.currentUser._id;

  Journal.findOne({ _id: journalId, user: userId })
    .then((theJournal) => {
      if (!theJournal) {
        console.log("Journal not found.");
        return res.redirect("/journallist");
      }
      res.render("users/journal/journal-details", { journal: theJournal });
      console.log("Journal details:", theJournal);
    })
    .catch((error) => {
      console.log("Error while retrieving journal details: ", error);
      res
        .status(500)
        .send("An error occurred while retrieving the journal details.");
    });
});


//edit

router.get("/journal/:journalId/edit", isLoggedIn, (req, res, next) => {
  const { journalId } = req.params;
  const userId = req.session.currentUser._id;

  Journal.findOne({ _id: journalId, user: userId })
    .then((journalToEdit) => {
      if (!journalToEdit) {
        console.log("Journal not found.");
        return res.redirect("/journallist");
      }
      res.render("users/journal/journal-edit.hbs", { journal: journalToEdit });
    })
    .catch((error) => next(error));
});

// save changes
router.post("/journal/:journalId/edit", isLoggedIn, (req, res, next) => {
  const { journalId } = req.params;
  const { content } = req.body;
  const userId = req.session.currentUser._id;

  Journal.findByIdAndUpdate(
    journalId,
    { $set: { content }, user: userId },
    { new: true }
  )
    .then((updatedJournal) => {
      if (!updatedJournal) {
        console.log("Journal not found.");
        return res.redirect("/journallist");
      }
      res.redirect(`/journal/${updatedJournal._id}`);
    })
    .catch((error) => {
      console.log("Error while updating journal: ", error);
      next(error);
    });
});


// delete

router.post("/journal/:journalId/delete", isLoggedIn, (req, res, next) => {
  const { journalId } = req.params;
  const userId = req.session.currentUser._id;

  Journal.findOneAndDelete({ _id: journalId, user: userId })
    .then((deletedJournal) => {
      if (!deletedJournal) {
        console.log("Journal not found.");
        return res.redirect("/journallist");
      }
      res.redirect("/journallist");
    })
    .catch((error) => {
      console.log("Error while deleting journal: ", error);
      next(error);
    });
});

//Habits for user profile

const { pushUps } = require("../models/HabitsTracker.model.js");

router.get("/7days/pushups", isLoggedIn, (req, res, next) => {
  const userId = req.session.currentUser._id;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  pushUps
    .find({ user: userId, date: { $gte: sevenDaysAgo } })
    .sort({ date: -1 })
    .then((allPushUpsFromDB) => {
      res.json(allPushUpsFromDB); 
    })
    .catch((error) => {
      console.log("Error while getting the push-ups from the DB: ", error);
      res.status(500).send("An error occurred while retrieving the push-ups.");
    });
});

/*water*/

const { water } = require("../models/HabitsTracker.model.js");


router.get("/7days/water", (req, res, next) => {
  const userId = req.session.currentUser._id;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  water
    .find({ user: userId, date: { $gte: sevenDaysAgo } })
    .sort({ date: -1 })
    .then((allWaterFromDB) => {
      res.json(allWaterFromDB); 
    })
    .catch((error) => {
      console.log("Error while getting the water records from the DB: ", error);
      res.status(500).send("An error occurred while retrieving the water records.");
    });
});

/* yoga */

const { yoga } = require("../models/HabitsTracker.model.js");


router.get("/7days/yoga", (req, res, next) => {
  const userId = req.session.currentUser._id;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  yoga
    .find({ user: userId, date: { $gte: sevenDaysAgo } })
    .sort({ date: -1 })
    .then((allYogaFromDB) => {
      res.json(allYogaFromDB); 
    })
    .catch((error) => {
      console.log("Error while getting the yoga records from the DB: ", error);
      res.status(500).send("An error occurred while retrieving the yoga records.");
    });
});



module.exports = router;
