import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" }
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);