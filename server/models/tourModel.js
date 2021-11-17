const mongoose = require('mongoose');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have duration'],
    },

    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must include group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty level'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: [true, 'A tour must include its price'],
    },
    stops: {
      type: Number,
      required: [true, 'A tour must have no of stops'],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have its summary'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have its description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have cover image'],
    },
    images: [String],
    startDates: {
      type: Date,
      required: [true, 'A tour must have start dates'],
    },
    location: {
      type: String,
      required: [true, 'A tour must have its location'],
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
