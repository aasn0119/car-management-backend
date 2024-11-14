const Car = require("../models/Car");
const User = require("../models/User");

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const {
      title,
      description,
      make,
      model,
      year,
      carType,
      condition,
      price,
      color,
      transmission,
      fuelType,
      tags,
      availability,
      location,
      warranty,
      registration,
      pricing,
      financing,
    } = req.body;
    console.log("req.body", req.body);

    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const car = new Car({
      title,
      description,
      make,
      model,
      year,
      carType,
      condition,
      price,
      color: JSON.parse(color),
      transmission,
      fuelType,
      tags,
      availability,
      location: JSON.parse(location),
      warranty: JSON.parse(warranty),
      registration: JSON.parse(registration),
      pricing: JSON.parse(pricing),
      financing: JSON.parse(financing),
      images,
      owner: req.user.id,
    });
    await car.save();

    // Update the user's cars array
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { cars: car._id } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      message: "Car created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error, please try again later :: " + error.message,
    });
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  try {
    const {
      title,
      description,
      make,
      model,
      year,
      carType,
      condition,
      price,
      color,
      transmission,
      fuelType,
      tags,
      availability,
      location,
      warranty,
      registration,
      pricing,
      financing,
      removeImages,
    } = req.body;

    const car = await Car.findById(req.params.id);

    if (!car || car.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update fields if provided
    car.title = title || car.title;
    car.description = description || car.description;
    car.make = make || car.make;
    car.model = model || car.model;
    car.year = year || car.year;
    car.carType = carType || car.carType;
    car.condition = condition || car.condition;
    car.price = price || car.price;
    car.color = color || car.color;
    car.transmission = transmission || car.transmission;
    car.fuelType = fuelType || car.fuelType;
    car.tags = tags || car.tags;
    car.availability = availability || car.availability;
    car.location = location || car.location;
    car.warranty = warranty || car.warranty;
    car.registration = registration || car.registration;
    car.pricing = pricing || car.pricing;
    car.financing = financing || car.financing;

    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      car.images = [...car.images, ...newImages];
    }

    // Remove specified images
    if (removeImages && Array.isArray(removeImages)) {
      car.images = car.images.filter((image) => !removeImages.includes(image));
    }

    await car.save();

    res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cars for the logged-in user
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching Cars" });
  }
};

// Get a specific car
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    // Step 1: Find and delete the car
    const car = await Car.findByIdAndDelete(req.params.id);

    // Step 2: Check if the car was found and deleted
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Step 3: Check if the logged-in user is the owner of the car
    if (car.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this car" });
    }

    // Step 4: Return a success message
    res.json({ status: 200, message: "Car details removed successfully" });
  } catch (error) {
    // Step 5: Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};
