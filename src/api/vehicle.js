const express = require("express");
const vehicleService = require("../service/vehicleService");
const socket = require("../api/socket").getInstance();
const apiRouter = express.Router();

var registeredVehicles = new Map();

// register vehicle
// host/vehicles/
apiRouter.post("/", (req, res) => {
  const { id } = req.body;

  if (id) {
    addVehicle(id);
  }
  res.status(204).send();
});

// update locqtion

// host/vehicles/:id/locations
apiRouter.post("/:id/locations", (req, res) => {
  const { id } = req.params;
  const { lat, lng, at } = req.body;

  const date = new Date(at);
  const value = registeredVehicles.get(id);

  // test vehicle if exist in the map list
  if (value != null) {
    // get diff in seconds between the last updated time and sent updated time
    var seconds = differenceTimeSeconds(date, value);

    const vehicle = { lat, lng };
    const office = { lat: 52.53, lng: 13.403 };

    // distance between office and the current vehicle in meters
    const distance = distanceTwoCoordinates(vehicle, office);

    if (distance > 3500) {
      removeVehicle(id);
    } else if (+seconds > 3) {
      // add to database
      vehicleService.createOrUpdateVehicle(id, lat, lng, at);
      // update location
      registeredVehicles.set(id, date);
      const veh = { id, lat, lng, at };
      socket.sendUpdateVehicle(veh);
    } else {
    }
  }
  res.status(204).send();
});

apiRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    removeVehicle(id);
  }
  res.status(204).send();
});

apiRouter.get("/all", async (req, res) => {
  const list = await vehicleService.getAllVehicle();
  res.json(list);
});

addVehicle = vehicleID => {
  console.log(`Vehicle ${vehicleID} was added`);
  registeredVehicles.set(vehicleID, new Date(2000, 2, 1));
};

removeVehicle = vehicleID => {
  registeredVehicles.delete(vehicleID);
};

const differenceTimeSeconds = (date1, date2) => {
  return Math.abs((date1.getTime() - date2.getTime()) / 1000);
};

// Distance Utils

const toRadians = number => {
  return (number * Math.PI) / 180;
};

const distanceTwoCoordinates = (p1, p2) => {
  var R = 6371e3; // metres
  var φ1 = toRadians(p1.lat);
  var φ2 = toRadians(p2.lat);
  var Δφ = toRadians(p2.lat - p1.lat);
  var Δλ = toRadians(p2.lng - p1.lng);
  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

module.exports = apiRouter;
