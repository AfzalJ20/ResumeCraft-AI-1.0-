const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
validateResume,
} = require("../validators/resumeValidator");

const {
    createResume,
    getAllResumes,
    getResume,
    updateResume,
    deleteResume
} = require("../controllers/resumeController");

/**
 * @swagger
 * /api/resume/create:
 *   post:
 *     summary: Create a new resume
 *     tags:
 *       - Resume
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - personalInfo
 *             properties:
 *               title:
 *                 type: string
 *                 example: Software Engineer Resume
 *               personalInfo:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: Javid Afzal
 *                   email:
 *                     type: string
 *                     example: javid@gmail.com
 *                   phone:
 *                     type: string
 *                     example: "9876543210"
 *               summary:
 *                 type: string
 *                 example: Passionate MERN Stack Developer
 *     responses:
 *       201:
 *         description: Resume created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/create",
    protect,
    validateResume,
    createResume
);

/**
 * @swagger
 * /api/resume/all:
 *   get:
 *     summary: Get All Resumes
 *     tags:
 *       - Resume
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all resumes
 */
router.get("/all", protect, getAllResumes);

/**
 * @swagger
 * /api/resume/{id}:
 *   get:
 *     summary: Get Resume by ID
 *     tags:
 *       - Resume
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume Retrieved Successfully
 *       404:
 *         description: Resume Not Found
 */
router.get("/:id", protect, getResume);
/**
 * @swagger
 * /api/resume/{id}:
 *   put:
 *     summary: Update Resume
 *     tags:
 *       - Resume
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume Updated Successfully
 */
router.put("/:id", protect, updateResume);
/**
 * @swagger
 * /api/resume/{id}:
 *   delete:
 *     summary: Delete Resume
 *     tags:
 *       - Resume
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resume Deleted Successfully
 */
router.delete("/:id", protect, deleteResume);

module.exports = router;