const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
      // e.g., Toyota, Honda, BMW
    },
    model: {
      type: String,
      required: true,
      // e.g., Camry, Civic, X5
    },
    year: {
      type: Number,
      required: true,
    },
    carType: {
      type: String,
      required: true,
      enum: [
        "Sedan",
        "SUV",
        "Hatchback",
        "Coupe",
        "Truck",
        "Van",
        "Convertible",
        "Wagon",
      ],
    },
    condition: {
      type: String,
      required: true,
      enum: ["New", "Used", "Certified Pre-Owned"],
    },
    color: {
      exterior: String,
      interior: String,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual", "CVT"],
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "Plugin Hybrid", "CNG"],
    },
    tags: [String],
    images: [
      {
        type: String, // Store image URLs or paths
        description: String, // Optional description for each image
      },
    ],
    availability: {
      type: String,
      enum: ["Available", "Sold", "Reserved", "In Service"],
      default: "Available",
    },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere", // Enables geospatial queries
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    warranty: {
      isWarranty: Boolean,
      expiryDate: Date,
      description: String,
    },
    registration: {
      number: String,
      registrationDate: Date,
      expiryDate: Date,
    },
    pricing: {
      listPrice: Number,
      sellingPrice: Number,
      onRoadPrice: Number,
      taxAmount: Number,
      discount: Number,
    },
    financing: {
      isFinancingAvailable: Boolean,
      emiOptions: [
        {
          tenure: Number, // in months
          interestRate: Number,
          emiAmount: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
carSchema.index({ make: 1, model: 1 });
carSchema.index({ "location.city": 1 });
carSchema.index({ carType: 1 });
carSchema.index({ year: -1 });

module.exports = mongoose.model("Car", carSchema);
