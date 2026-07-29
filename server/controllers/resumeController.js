const Resume = require("../models/Resume");

// Create Resume
exports.createResume = async (req, res, next) => {

    try{

        const resume = await Resume.create({
            user:req.user.id,
            ...req.body
        });

        res.status(201).json({
            success:true,
            message:"Resume Created Successfully",
            resume
        });

    }catch (error) {
    next(error);
}

};
// Get All Resumes
exports.getAllResumes = async (req, res) => {
try {

    const resumes = await Resume.find({
    user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
    success: true,
    count: resumes.length,
    resumes
    });

} catch (error) {

    console.error(error);

    res.status(500).json({
    success: false,
    message: "Server Error"
    });

}
};

// Get Single Resume
exports.getResume = async (req, res) => {

try {

    const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.user.id
    });

    if (!resume) {
    return res.status(404).json({
        success: false,
        message: "Resume not found"
    });
    }

    res.status(200).json({
    success: true,
    resume
    });

} catch (error) {

    res.status(500).json({
    success: false,
    message: "Server Error"
    });

}

};

// Update Resume
exports.updateResume = async (req, res) => {

try {

    const resume = await Resume.findOneAndUpdate(
    {
        _id: req.params.id,
        user: req.user.id
    },
    req.body,
    {
        new: true
    }
    );

    if (!resume) {
    return res.status(404).json({
        success: false,
        message: "Resume not found"
    });
    }

    res.status(200).json({
    success: true,
    message: "Resume Updated Successfully",
    resume
    });

} catch (error) {

    res.status(500).json({
    success: false,
    message: "Server Error"
    });

}

};

// Delete Resume
exports.deleteResume = async (req, res) => {

try {

    const resume = await Resume.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
    });

    if (!resume) {
    return res.status(404).json({
        success: false,
        message: "Resume not found"
    });
    }

    res.status(200).json({
    success: true,
    message: "Resume Deleted Successfully"
    });

} catch (error) {

    res.status(500).json({
    success: false,
    message: "Server Error"
    });

}

};