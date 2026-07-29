exports.validateResume = (req, res, next) => {

    const { title, personalInfo } = req.body;

    if (!title || title.trim() === "") {

        return res.status(400).json({
            success: false,
            message: "Resume title is required"
        });

    }

    if (!personalInfo) {

        return res.status(400).json({
            success: false,
            message: "Personal Information is required"
        });

    }

    if (!personalInfo.fullName) {

        return res.status(400).json({
            success: false,
            message: "Full Name is required"
        });

    }

    next();

};