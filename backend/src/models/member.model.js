import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },

    // teacher join approval workflow
    joinStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "approved",
    },
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);