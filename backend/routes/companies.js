const express = require('express');
const router = express.Router();
const Company = require('../models/Company');


router.get('/', async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: companies.length,
            data: companies
        });
    } catch (error) {
        console.error('❌ Get Companies Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }
        res.json({
            success: true,
            data: company
        });
    } catch (error) {
        console.error('❌ Get Company Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const { 
            name, 
            tier, 
            minCgpa, 
            openRoles,
            description,
            location,
            website,
            email,
            phone
        } = req.body;

        
        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return res.status(400).json({
                success: false,
                message: 'Company already exists with this name'
            });
        }

        const company = new Company({
            name,
            tier: tier || 'Product',
            minCgpa: parseFloat(minCgpa) || 0,
            openRoles: parseInt(openRoles) || 0,
            description: description || '',
            location: location || '',
            website: website || '',
            email: email || '',
            phone: phone || ''
        });

        await company.save();

        res.status(201).json({
            success: true,
            message: 'Company added successfully',
            data: company
        });
    } catch (error) {
        console.error('❌ Create Company Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Company updated successfully',
            data: company
        });
    } catch (error) {
        console.error('❌ Update Company Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }
        res.json({
            success: true,
            message: 'Company deleted successfully'
        });
    } catch (error) {
        console.error('❌ Delete Company Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;