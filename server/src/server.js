require("dotenv").config();

const app = require("./app");
const { mongoConnect } = require("./utils/mongo");
const { loadLaunchesData } = require("./models/lunches.model");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();

    app.listen(PORT, () => {
      console.log(`Listing on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
