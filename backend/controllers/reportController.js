const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Test = require('../models/Test');


exports.getAllReports = async (req, res) => {
    try {
        const reports = [
            {
                id: '1',
                type: 'placement',
                title: 'Placement Report',
                description: 'Overall placement statistics',
                count: await Application.countDocuments(),
                createdAt: new Date()
            },
            {
                id: '2',
                type: 'student',
                title: 'Student Report',
                description: 'Student enrollment and performance',
                count: await User.countDocuments({ role: 'student' }),
                createdAt: new Date()
            },
            {
                id: '3',
                type: 'company',
                title: 'Company Report',
                description: 'Company recruitment activity',
                count: await Company.countDocuments(),
                createdAt: new Date()
            },
            {
                id: '4',
                type: 'test',
                title: 'Test Report',
                description: 'Test performance analysis',
                count: await Test.countDocuments(),
                createdAt: new Date()
            }
        ];
        
        res.json({
            success: true,
            count: reports.length,
            data: reports
        });
    } catch (error) {
        console.error('❌ Get Reports Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


exports.generateReport = async (req, res) => {
    try {
        const { type, department, fromDate, toDate } = req.body;
        
        let reportData = {};
        let title = '';
        
        switch(type) {
            case 'placement':
                title = 'Placement Report';
                reportData = await generatePlacementReport(department, fromDate, toDate);
                break;
            case 'student':
                title = 'Student Report';
                reportData = await generateStudentReport(department, fromDate, toDate);
                break;
            case 'company':
                title = 'Company Report';
                reportData = await generateCompanyReport(fromDate, toDate);
                break;
            case 'test':
                title = 'Test Report';
                reportData = await generateTestReport(fromDate, toDate);
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Invalid report type'
                });
        }
        
        res.json({
            success: true,
            message: 'Report generated successfully',
            data: {
                title,
                type,
                generatedAt: new Date(),
                ...reportData
            }
        });
    } catch (error) {
        console.error('❌ Generate Report Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


async function generatePlacementReport(department, fromDate, toDate) {
    const query = {};
    if (fromDate) query.appliedDate = { $gte: new Date(fromDate) };
    if (toDate) query.appliedDate = { ...query.appliedDate, $lte: new Date(toDate) };
    
    const applications = await Application.find(query)
        .populate('student', 'name email department cgpa')
        .populate({
            path: 'job',
            populate: {
                path: 'company',
                select: 'name'
            }
        });

   
    let filteredApps = applications;
    if (department && department !== 'ALL') {
        filteredApps = applications.filter(a => a.student?.department === department);
    }

    const total = filteredApps.length;
    const selected = filteredApps.filter(a => a.status === 'Selected').length;
    const shortlisted = filteredApps.filter(a => a.status === 'Shortlisted').length;
    const rejected = filteredApps.filter(a => a.status === 'Rejected').length;
    const pending = filteredApps.filter(a => a.status === 'Pending').length;

    // Department wise stats
    const departments = [...new Set(filteredApps.map(a => a.student?.department))];
    const departmentStats = {};
    departments.forEach(dept => {
        if (!dept) return;
        const deptApps = filteredApps.filter(a => a.student?.department === dept);
        departmentStats[dept] = {
            total: deptApps.length,
            selected: deptApps.filter(a => a.status === 'Selected').length,
            shortlisted: deptApps.filter(a => a.status === 'Shortlisted').length,
            rejected: deptApps.filter(a => a.status === 'Rejected').length
        };
    });

    return {
        summary: {
            totalApplications: total,
            selected,
            shortlisted,
            rejected,
            pending,
            selectionRate: total > 0 ? Math.round((selected / total) * 100) : 0
        },
        departmentStats,
        recentApplications: filteredApps.slice(0, 10)
    };
}


async function generateStudentReport(department, fromDate, toDate) {
    const query = { role: 'student' };
    if (department && department !== 'ALL') query.department = department;
    if (fromDate) query.createdAt = { $gte: new Date(fromDate) };
    if (toDate) query.createdAt = { ...query.createdAt, $lte: new Date(toDate) };

    const students = await User.find(query).select('-password');
    
    const total = students.length;
    const departments = [...new Set(students.map(s => s.department))];
    const departmentStats = {};
    
    departments.forEach(dept => {
        if (!dept) return;
        const deptStudents = students.filter(s => s.department === dept);
        departmentStats[dept] = {
            count: deptStudents.length,
            avgCgpa: deptStudents.reduce((sum, s) => sum + (s.cgpa || 0), 0) / deptStudents.length || 0
        };
    });

    const cgpaDistribution = {
        below6: students.filter(s => s.cgpa < 6).length,
        sixToSeven: students.filter(s => s.cgpa >= 6 && s.cgpa < 7).length,
        sevenToEight: students.filter(s => s.cgpa >= 7 && s.cgpa < 8).length,
        eightToNine: students.filter(s => s.cgpa >= 8 && s.cgpa < 9).length,
        aboveNine: students.filter(s => s.cgpa >= 9).length
    };

    return {
        summary: {
            totalStudents: total,
            avgCgpa: total > 0 ? students.reduce((sum, s) => sum + (s.cgpa || 0), 0) / total : 0,
            departments: Object.keys(departmentStats).length
        },
        departmentStats,
        cgpaDistribution,
        recentStudents: students.slice(0, 10)
    };
}


async function generateCompanyReport(fromDate, toDate) {
    const query = {};
    if (fromDate) query.createdAt = { $gte: new Date(fromDate) };
    if (toDate) query.createdAt = { ...query.createdAt, $lte: new Date(toDate) };

    const companies = await Company.find(query);
    
    const total = companies.length;
    const tiers = ['Product', 'Services', 'Startup'];
    const tierStats = {};
    
    tiers.forEach(tier => {
        const tierCompanies = companies.filter(c => c.tier === tier);
        tierStats[tier] = {
            count: tierCompanies.length,
            totalRoles: tierCompanies.reduce((sum, c) => sum + (c.openRoles || 0), 0)
        };
    });

    return {
        summary: {
            totalCompanies: total,
            activeCompanies: companies.filter(c => c.status !== 'Inactive').length,
            totalOpenRoles: companies.reduce((sum, c) => sum + (c.openRoles || 0), 0)
        },
        tierStats,
        recentCompanies: companies.slice(0, 10)
    };
}


async function generateTestReport(fromDate, toDate) {
    const query = {};
    if (fromDate) query.createdAt = { $gte: new Date(fromDate) };
    if (toDate) query.createdAt = { ...query.createdAt, $lte: new Date(toDate) };

    const tests = await Test.find(query);
    
    const total = tests.length;
    const types = ['aptitude', 'technical', 'coding', 'mock'];
    const typeStats = {};
    
    types.forEach(type => {
        const typeTests = tests.filter(t => t.type === type);
        typeStats[type] = {
            count: typeTests.length,
            avgMarks: typeTests.length > 0 ? 
                typeTests.reduce((sum, t) => sum + (t.totalMarks || 0), 0) / typeTests.length : 0
        };
    });

    const statusStats = {
        published: tests.filter(t => t.isActive === true).length,
        draft: tests.filter(t => t.isActive === false && t.status === 'draft').length,
        scheduled: tests.filter(t => t.status === 'scheduled').length
    };

    return {
        summary: {
            totalTests: total,
            totalQuestions: tests.reduce((sum, t) => sum + (t.questions?.length || 0), 0),
            totalDuration: tests.reduce((sum, t) => sum + (t.duration || 0), 0)
        },
        typeStats,
        statusStats,
        recentTests: tests.slice(0, 10)
    };
}