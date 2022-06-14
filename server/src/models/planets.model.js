const planets = require("./planets.mongo");

const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

function isHabitablePlanets(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanets(data)) {
          await savePlanets(data);
        }
      })
      .on("error", (err) => reject(err))
      .on("end", () => {
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({}); // {} => find all documents
}

async function savePlanets(planet) {
  try {
    // TODO: Replace below create with upsert -> insert + update
    // The document has not been added, if it does not exist

    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(`Could not save planet ${error}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
