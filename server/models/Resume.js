const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
{
    // This links the resume to the logged-in user
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },

    title: {
    type: String,
    required: true,
    },

    personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    },

    summary: {
    type: String,
    default: "",
    },

    education: [
    {
        degree: String,
        college: String,
        year: String,
        cgpa: String,
    },
    ],

    skills: [String],
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Resume", resumeSchema);