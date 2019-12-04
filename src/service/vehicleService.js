const Vehicles = require("../models/vehicle");

const createOrUpdateVehicle = async (id, lat, lng, at) => {
  try {
    const vehicle = await Vehicles.findOne({ id });
    let result;
    console.log({ id, lat, lng, at });
    if (vehicle != null) {
      const point = { lat, lng, at };
      const update = {
        $push: {
          path: point
        }
      };
      const veh = await Vehicles.findOneAndUpdate({ id }, update);
      const final = await veh.save();
    } else {
      const vehicle = { id, path: [{ lat, lng, at }] };
      const result = await Vehicles.create(vehicle);
    }
    console.log("update done");
  } catch (error) {
    console.log(error);
  }
};

const getAllVehicle = async () => {
  const vehicle = { id: 1, path: [{ lat: 15, lng: 15, at: null }] };
  const result = await Vehicles.find();
  return result;
};

const getVehiclePaths = async id => {
  return await Vehicles.findOne({ id });
};

module.exports = { createOrUpdateVehicle, getAllVehicle, getVehiclePaths };
