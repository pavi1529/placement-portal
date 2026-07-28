const express = require('express');
const router = express.Router();
const CodingChallenge = require('../models/CodingChallenge');
const CodingSubmission = require('../models/CodingSubmission'); 


router.get('/challenges', async (req, res) => {
    try {
        const challenges = await CodingChallenge.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: challenges.length,
            data: challenges
        });
    } catch (error) {
        console.error('❌ Get Challenges Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/challenges/:id', async (req, res) => {
    try {
        const challenge = await CodingChallenge.findById(req.params.id)
            .populate('createdBy', 'name email');

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: 'Challenge not found'
            });
        }

        res.json({
            success: true,
            data: challenge
        });
    } catch (error) {
        console.error('❌ Get Challenge Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.post('/challenges', async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,
            language,
            testCases,
            solution,
            points,
            timeLimit,
            category,
            starterCode,
            constraints,
            examples
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }

        const challenge = new CodingChallenge({
            title,
            description,
            difficulty: difficulty || 'easy',
            language: language || 'javascript',
            testCases: testCases || [],
            solution: solution || '',
            points: points || 10,
            timeLimit: timeLimit || 30,
            category: category || 'algorithms',
            starterCode: starterCode || '',
            constraints: constraints || '',
            examples: examples || '',
            createdBy: req.user?.id || null,
            status: 'Active'
        });

        await challenge.save();

        res.status(201).json({
            success: true,
            message: 'Coding challenge added successfully',
            data: challenge
        });
    } catch (error) {
        console.error('❌ Create Challenge Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

router.put('/challenges/:id', async (req, res) => {
    try {
        const challenge = await CodingChallenge.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: 'Challenge not found'
            });
        }

        res.json({
            success: true,
            message: 'Coding challenge updated successfully',
            data: challenge
        });
    } catch (error) {
        console.error('❌ Update Challenge Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.delete('/challenges/:id', async (req, res) => {
    try {
        const challenge = await CodingChallenge.findByIdAndDelete(req.params.id);

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: 'Challenge not found'
            });
        }

        res.json({
            success: true,
            message: 'Coding challenge deleted successfully'
        });
    } catch (error) {
        console.error('❌ Delete Challenge Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/submissions', async (req, res) => {
    try {
        const submissions = await CodingSubmission.find()
            .populate('student', 'name email')
            .populate('challenge', 'title')
            .sort({ submittedAt: -1 });

        res.json({
            success: true,
            count: submissions.length,
            data: submissions
        });
    } catch (error) {
        console.error('❌ Get Submissions Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/submissions/:id', async (req, res) => {
    try {
        const submission = await CodingSubmission.findById(req.params.id)
            .populate('student', 'name email')
            .populate('challenge', 'title description');

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        res.json({
            success: true,
            data: submission
        });
    } catch (error) {
        console.error('❌ Get Submission Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.post('/submissions', async (req, res) => {
    try {
        const { student, challenge, code, language } = req.body;

        if (!student || !challenge || !code) {
            return res.status(400).json({
                success: false,
                message: 'Student, challenge, and code are required'
            });
        }

        const submission = new CodingSubmission({
            student,
            challenge,
            code,
            language: language || 'javascript',
            status: 'pending',
            score: 0
        });

        await submission.save();

        const populatedSubmission = await CodingSubmission.findById(submission._id)
            .populate('student', 'name email')
            .populate('challenge', 'title');

        res.status(201).json({
            success: true,
            message: 'Submission created successfully',
            data: populatedSubmission
        });
    } catch (error) {
        console.error('❌ Create Submission Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.put('/submissions/:id/status', async (req, res) => {
    try {
        const { status, score } = req.body;

        const submission = await CodingSubmission.findByIdAndUpdate(
            req.params.id,
            { status, score, updatedAt: new Date() },
            { new: true }
        )
        .populate('student', 'name email')
        .populate('challenge', 'title');

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        res.json({
            success: true,
            message: 'Submission status updated successfully',
            data: submission
        });
    } catch (error) {
        console.error('❌ Update Submission Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;