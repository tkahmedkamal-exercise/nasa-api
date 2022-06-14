const express = require("express");

const {
  httpGetAllLunches,
  httpAddNewLuncher,
  httpAbortLaunch,
} = require("./lunches.controller");

const router = express.Router();

router.get("/", httpGetAllLunches);

router.post("/", httpAddNewLuncher);

router.delete("/:id", httpAbortLaunch);

module.exports = router;
