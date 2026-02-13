const mongoose = require("mongoose");
const { Schema } = mongoose;

const SeatTemplateSchema = require("./seatTemplate.model");

const SeatLayoutSchema = new Schema(
  {
    layoutId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    column: {
      type: Number,
      required: true,
      min: 1,
    },
    row: {
      type: Number,
      required: true,
      min: 1,
    },
    floors: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 2,
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },
    layoutVersion: {
      type: String,
      default: "v1.0",
    },

    templates: [SeatTemplateSchema],

    info: {
      description: String,
      recommended: Boolean,
      popularity: Number,
      imageUrl: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "seat_layouts",
  },
);

module.exports = mongoose.model("SeatLayout", SeatLayoutSchema);
