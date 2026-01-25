import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        joinCode: { type: String, required: true ,unique: true},
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);
export default mongoose.model("Group", groupSchema);