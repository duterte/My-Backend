const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('../util');

const enumValue = {
  property: [
    'Residential Lot',
    'Commercial Lot',
    'House and Lot',
    'Appartment',
    'Hotel',
    'Condominium',
    'Commercial Space',
  ],
  marketing: [
    'My property is for sale',
    'My property is for rent',
    'This is a foreclosed property',
  ],
  status: [
    'Pre-selling',
    'Lot Ready to Build Home',
    'Lot Ready to Build Commercial Building',
  ],
  typeOfDelivery: ['bare', 'finished', 'semi-furnished', 'fully furnised'],
  typeOfHouse: ['Townhouse', 'Duplex', 'Bungalow', 'Single Detach'],
};

const validate = {
  validator: value => {
    const test = /<\/?script>|javascript:/gi.test(value);
    return !test;
  },
  message: () => `Hostile content`,
};

const SIMPLE_STRING = {
  type: String,
  default: undefined,
  validate: validate,
};

const ARRAY_STRING = {
  type: [String],
  default: undefined,
  validate: validate,
};

const imageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  imageUrls: {
    type: [
      {
        url: SIMPLE_STRING,
        name: SIMPLE_STRING,
      },
    ],
    default: undefined,
  },
});

const estateSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: SIMPLE_STRING,
    seo: SIMPLE_STRING,
    property: {
      type: String,
      enum: enumValue.property,
    },
    marketing: {
      type: String,
      enum: enumValue.marketing,
    },
    status: {
      type: String,
      enum: enumValue.status,
    },
    typeOfDelivery: {
      type: String,
      enum: enumValue.typeOfDelivery,
    },
    typeOfHouse: {
      type: String,
      enum: enumValue.typeOfHouse,
    },
    price: SIMPLE_STRING,
    buildingHeights: SIMPLE_STRING,
    lotSize: SIMPLE_STRING,
    bedroom: SIMPLE_STRING,
    bathroom: SIMPLE_STRING,
    parking: SIMPLE_STRING,
    typeOfParking: SIMPLE_STRING,
    features: ARRAY_STRING,
    ammenities: ARRAY_STRING,
    address: {
      type: {
        country: SIMPLE_STRING,
        province: SIMPLE_STRING,
        city: SIMPLE_STRING,
        street: SIMPLE_STRING,
      },
      default: undefined,
    },
    // important!! : validation of jsRaw is not yet implemented
    imageUrls: {
      type: [],
      default: undefined,
    },
    jsRaw: {},
  },
  { timestamps: true }
);

module.exports = {
  Estate: mongoose.model('Estate', estateSchema),
  Image: mongoose.model('Image', imageSchema),
};
