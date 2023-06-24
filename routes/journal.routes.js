const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const router = require("express").Router();

router.get("/success", (req, res) => res.render("users/success"));

// Checkin

const Checkin = require("../models/Checkin.model");

router.get("/checkin", isLoggedIn, (req, res) => res.render("users/check-in"));

router.post("/check-in", (req, res) => {
  const mood = req.body.scale;

  const checkin = new Checkin({
    mood,
  });

  checkin
    .save()
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
// Save

const Journal = require("../models/Journal.model");

router.post("/journal", (req, res) => {
  const { content } = req.body;

  const newJournalEntry = new Journal({ content });

  newJournalEntry
    .save()
    .then(() => {
      console.log("Journal entry saved successfully");
      res.redirect("/success");
    })
    .catch((error) => {
      console.log("Error saving journal entry:", error);
      res.redirect("/error");
    });
});

// show last

router.get("/journal", async (req, res) => {
  try {
    const currentEntryCreatedAt = new Date();
    console.log("Current Entry CreatedAt:", currentEntryCreatedAt);
    console.log(typeof currentEntryCreatedAt);

    const previousEntry = await Journal.findOne({
      createdAt: { $lt: currentEntryCreatedAt },
    })
      .sort({ createdAt: -1 })
      .exec();

    if (!previousEntry) {
      console.log("No previous entry found.");
      return res.send("No previous entry found.");
    }

    console.log("Previous Entry Content:", previousEntry.content);

    return res.render("users/journal", {
      createdAt: previousEntry.createdAt,
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
router.get("/journallist", (req, res, next) => {
  Journal.find()
    .sort({ createdAt: -1 })
    .then((allJournalsFromDB) => {
      console.log("Retrieved journals from DB:", allJournalsFromDB);
      res.render("users/journal-list", { journals: allJournalsFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the journals from the DB: ", error);
      res
        .status(500)
        .send("An error occurred while retrieving the journal entries.");
    });
});

//details

router.get("/journal/:journalId", (req, res) => {
  const { journalIdId } = req.params;

  console.log("The ID from the URL is: ", journalId);

  res.render("journal/journal-details.hbs");
});

module.exports = router;
