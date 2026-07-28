const express = require('express');
const router = express.Router();
const Question = require('../models/Question');


router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: questions.length,
            data: questions
        });
    } catch (error) {
        console.error('❌ Get Questions Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        res.json({
            success: true,
            data: question
        });
    } catch (error) {
        console.error('❌ Get Question Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const { question, category, difficulty, options, correctAnswer, status } = req.body;

        if (!question || !options || !correctAnswer) {
            return res.status(400).json({
                success: false,
                message: 'Please provide question, options, and correct answer'
            });
        }

        const newQuestion = new Question({
            question,
            category: category || 'Aptitude',
            difficulty: difficulty || 'Medium',
            options: options.filter(opt => opt.trim() !== ''),
            correctAnswer,
            status: status || 'Draft'
        });

        await newQuestion.save();

        res.status(201).json({
            success: true,
            message: 'Question added successfully',
            data: newQuestion
        });
    } catch (error) {
        console.error('❌ Create Question Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Question updated successfully',
            data: question
        });
    } catch (error) {
        console.error('❌ Update Question Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        res.json({
            success: true,
            message: 'Question deleted successfully'
        });
    } catch (error) {
        console.error('❌ Delete Question Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;