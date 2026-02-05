const mongoose = require("mongoose");
const { Schema } = mongoose;

const BusSchema = new Schema(
  {
    busId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    license: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["seat", "sleeper", "limousine", "vip"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "maintenance", "repair"],
      default: "active",
      index: true,
    },

    miles: {
      type: Number,
      default: 0,
    },

    companyId: {
      type: String,
      required: true,
      index: true,
    },

    seats: {
      type: [
        {
          seatCode: {
            type: String,
            required: true,
          },
          floor: {
            type: Number,
            default: 1,
          },
          row: Number,
          column: Number,
          type: {
            type: String,
            enum: ["seat", "bed", "vip"],
            default: "seat",
          },
          isActive: {
            type: Boolean,
            default: true,
          },
        },
      ],
      default: [],
    },

    documents: {
      type: [
        {
          docName: {
            type: String,
            required: true,
          },
          expiryDate: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },

    maintenanceHistory: {
      type: [
        {
          serviceDate: {
            type: Date,
            required: true,
          },
          note: String,
        },
      ],
      default: [],
    },

    info: {
      totalTrips: {
        type: Number,
        default: 0,
      },
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
    collection: "buses",
  },
);

module.exports = mongoose.model("Bus", BusSchema);
