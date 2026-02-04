import mongoose from "mongoose";


const questionSchema = new mongoose.Schema(
    {
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },

       askedBy: {
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

        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 1000,    
        }}
    ,
    { timestamps: true }
);
export default mongoose.model("Question", questionSchema);
