import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        answeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 1000,
        },
    },
    { timestamps: true }        
);
export default mongoose.model("Answer", answerSchema);