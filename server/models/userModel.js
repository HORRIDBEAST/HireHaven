const mongoose=require("mongoose");
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
  
      email: {
        type: String,
        required: true,
        unique: true,
      },
  
      auth0Id: {
        type: String,
        required: true,
        unique: true,
      },
  
      appliedJobs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
      ],
  
      savedJobs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
      ],
  
      role: {
        type: String,
        enum: ["jobseeker", "recruiter","admin"],
        default: "jobseeker",
      },
  
      resume: {
        type: String,
      },
  
      profilePicture: {
        type: String,
      },
  
      bio: {
        type: String,
        default: "No bio provided",
      },
  
      profession: {
        type: String,
        default: "Unemployed",
      },
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", userSchema);
  
module.exports=User;