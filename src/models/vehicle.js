const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: null
    },
    path: [
      {
        lat: {
          type: Number
        },
        lng: {
          type: Number
        },
        at: {
          type: Date
        }
      }
    ]
  },
  { timestamps: true }
);

const Vehicles = mongoose.model("Vehicles", vehicleSchema);

module.exports = Vehicles;
