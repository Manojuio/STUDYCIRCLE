import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    link: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return v.startsWith("http");
        },
        message: "Link must start with http/https",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
