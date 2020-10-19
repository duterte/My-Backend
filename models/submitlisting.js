const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const estateSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    property: String,
    marketing: String,
    price: String,
    typeOfDelivery: String,
    typeOfHouse: String,
    buildingHeights: String,
    lotSize: String,
    bedroom: String,
    bathroom: String,
    parking: String,
    typeOfParking: String,
    features: {
      type: [String],
      default: undefined,
    },
    ammenities: {
      type: [String],
      default: undefined,
    },
    address: {
      country: String,
      province: String,
      city: String,
      street: String,
    },
    images: {
      type: [],
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Estate', estateSchema);
