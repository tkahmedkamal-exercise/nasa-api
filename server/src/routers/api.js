const express = require("express");

const api = express.Router();

const planetsRouter = require("./planets/planets.router");
const lunchesRouter = require("./lunches/lunches.router");

api.use("/planets", planetsRouter);
api.use("/launches", lunchesRouter);

module.exports = api;
