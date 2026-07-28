const Test = require('../models/Test');
const Question = require('../models/Question');
const User = require('../models/User');




exports.getAllTests = async (req, res) => {  // ✅ This function must exist
    try {
        const tests = await Test.find()
            .populate('questions')
            .populate('companies', 'name')
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tests.length,
            data: tests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getTestById = async (req, res) => {  // ✅ This function must exist
    try {
        const test = await Test.findById(req.params.id)
            .populate('questions')
            .populate('companies', 'name email')
            .populate('createdBy', 'name email');

        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Test not found'
            });
        }

        res.status(200).json({
            success: true,
            data: test
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.createTest = async (req, res) => {  // ✅ This function must exist
    try {
        const {
            title,
            description,
            type,
            questions,
            duration,
            totalMarks,
            passingMarks,
            companies,
            scheduledDate
        } = req.body;

       
        if (questions && questions.length > 0) {
            const questionDocs = await Question.find({
                '_id': { $in: questions }
            });
            if (questionDocs.length !== questions.length) {
                return res.status(400).json({
                    success: false,
                    message: 'Some questions not found'
                });
            }
        }

        const test = new Test({
            title,
            description,
            type,
            questions: questions || [],
            duration,
            totalMarks,
            passingMarks,
            companies: companies || [],
            scheduledDate,
            createdBy: req.user.id
        });

        await test.save();

        const populatedTest = await Test.findById(test._id)
            .populate('questions')
            .populate('companies', 'name')
            .populate('createdBy', 'name email');

        res.status(201).json({
            success: true,
            message: 'Test created successfully',
            data: populatedTest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.updateTest = async (req, res) => {  // ✅ This function must exist
    try {
        const test = await Test.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        .populate('questions')
        .populate('companies', 'name')
        .populate('createdBy', 'name email');

        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Test not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Test updated successfully',
            data: test
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.deleteTest = async (req, res) => {  // ✅ This function must exist
    try {
        const test = await Test.findByIdAndDelete(req.params.id);

        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Test not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Test deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getTestQuestions = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id)
            .populate('questions');

        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Test not found'
            });
        }

        res.status(200).json({
            success: true,
            data: test.questions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.submitTest = async (req, res) => {
    try {
        const { answers } = req.body;
        const testId = req.params.id;
        const studentId = req.user.id;

       
        const test = await Test.findById(testId).populate('questions');
        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Test not found'
            });
        }

       
        let correctAnswers = 0;
        let totalQuestions = test.questions.length;

        test.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });

        const score = (correctAnswers / totalQuestions) * 100;
        const passed = score >= test.passingMarks;

        
        const result = {
            test: testId,
            student: studentId,
            answers,
            score,
            correctAnswers,
            totalQuestions,
            passed,
            submittedAt: new Date()
        };

        res.status(200).json({
            success: true,
            message: 'Test submitted successfully',
            data: {
                score,
                correctAnswers,
                totalQuestions,
                passed,
                passingMarks: test.passingMarks
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.getTestResults = async (req, res) => {
    try {
        
        res.status(200).json({
            success: true,
            message: 'Test results fetched successfully',
            data: {
                testId: req.params.id,
                averageScore: 75,
                totalParticipants: 10,
                passRate: 80
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};