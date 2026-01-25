import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { 
        type: String, required: true, unique: true, trim: true },
    email:
     { type: String, required: true, unique: true, lowercase: true },
    password: 
    { type: String,
    required: true,
  
          minlength: 6 
        },
    role: { type: String, enum: ["student", "teacher"], default: "student" }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);