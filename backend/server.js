const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();


const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/placement_portal')
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    seedDatabase();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });




const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  department: { type: String, default: 'CSE' },
  cgpa: { type: Number, default: 0 },
  phone: { type: String, default: '' },
  year: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);


const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  website: { type: String, default: '' },
  description: { type: String, default: '' },
  industry: { type: String, default: 'Technology' },
  tier: { type: String, enum: ['Product', 'Services', 'Startup'], default: 'Product' },
  minCgpa: { type: String, default: '7.0' },
  openRoles: { type: Number, default: 0 },
  location: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Company = mongoose.model('Company', CompanySchema);


const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  companyName: { type: String, default: '' },
  description: { type: String, default: '' },
  requirements: { type: String, default: '' },
  location: { type: String, default: '' },
  salary: { type: String, default: '' },
  type: { type: String, enum: ['full-time', 'part-time', 'internship', 'contract'], default: 'full-time' },
  category: { type: String, default: '' },
  experience: { type: String, default: '' },
  deadline: { type: Date, default: null },
  positions: { type: Number, default: 1 },
  status: { type: String, enum: ['Active', 'Pending', 'Closed'], default: 'Active' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  correctAnswer: { type: String, default: '' },
  category: { type: String, default: 'aptitude' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);


const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'success', 'warning', 'error'], default: 'info' },
  target: { type: String, enum: ['all', 'students', 'companies'], default: 'all' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);


const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  type: { type: String, enum: ['aptitude', 'technical', 'coding', 'mock'], default: 'aptitude' },
  duration: { type: Number, default: 30 },
  totalMarks: { type: Number, default: 100 },
  passingMarks: { type: Number, default: 40 },
  scheduledDate: { type: Date, default: null },
  questions: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

const Test = mongoose.model('Test', TestSchema);


const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  studentName: { type: String, default: '' },
  studentEmail: { type: String, default: '' },
  company: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'shortlisted', 'selected', 'rejected', 'applied'], default: 'pending' },
  appliedDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);


const ReportSchema = new mongoose.Schema({
  type: { type: String, enum: ['placement', 'student', 'company', 'test'], default: 'placement' },
  department: { type: String, default: 'ALL' },
  fromDate: { type: Date, default: null },
  toDate: { type: Date, default: null },
  data: { type: Object, default: {} },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Report = mongoose.model('Report', ReportSchema);


const JWT_SECRET = 'placement_portal_secret_key_2026';
const SALT_ROUNDS = 10;


async function seedDatabase() {
  try {
   
    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', SALT_ROUNDS);
      const admin = new User({ name: 'Admin User', email: 'admin@gmail.com', password: hashedPassword, role: 'admin' });
      await admin.save();
      console.log('✅ Admin created');
    }

   
    const studentExists = await User.findOne({ email: 'pavi@gmail.com' });
    if (!studentExists) {
      const hashedPassword = await bcrypt.hash('123456', SALT_ROUNDS);
      const student = new User({ name: 'Pavi Student', email: 'pavi@gmail.com', password: hashedPassword, role: 'student', department: 'CSE', cgpa: 8.5 });
      await student.save();
      console.log('✅ Student created');
    }

   
    const companies = ['Google', 'Microsoft', 'Amazon', 'Zoho', 'PayPal'];
    for (const name of companies) {
      const exists = await Company.findOne({ name });
      if (!exists) {
        const company = new Company({ name, email: 'hr@' + name.toLowerCase() + '.com', tier: 'Product', openRoles: 10 });
        await company.save();
        console.log('✅ Company created: ' + name);
      }
    }

   
    const sampleJobs = [
      { title: 'Software Engineer', location: 'Bangalore', salary: '₹25 LPA', type: 'full-time', status: 'Active' },
      { title: 'Full Stack Developer', location: 'Hyderabad', salary: '₹22 LPA', type: 'full-time', status: 'Active' },
      { title: 'Data Scientist', location: 'Chennai', salary: '₹20 LPA', type: 'full-time', status: 'Closed' }
    ];
    const googleCompany = await Company.findOne({ name: 'Google' });
    for (const jobData of sampleJobs) {
      const exists = await Job.findOne({ title: jobData.title });
      if (!exists) {
        const job = new Job({ 
          ...jobData, 
          company: googleCompany ? googleCompany._id : null, 
          companyName: googleCompany ? googleCompany.name : 'Google' 
        });
        await job.save();
        console.log('✅ Job created: ' + jobData.title);
      }
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seed error:', error);
  }
}


app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ name, email, password: hashedPassword, role: role || 'student' });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ 
      success: true, 
      message: 'User registered', 
      data: { id: user._id, name, email, role: user.role, token } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (role && user.role !== role) {
      return res.status(401).json({ success: false, message: 'Invalid credentials for ' + role });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ 
      success: true, 
      data: { id: user._id, name: user.name, email: user.email, role: user.role, token } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


const getToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return authHeader.split(' ')[1];
};


const verifyAdmin = async (req) => {
  const token = getToken(req);
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return null;
    return decoded;
  } catch (error) {
    return null;
  }
};


app.get('/api/admin/students', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const students = await User.find({ role: 'student' }).select('-password');
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/admin/students', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const { name, email, password, department, cgpa, phone, year } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password || 'Student@123', SALT_ROUNDS);
    const student = new User({ 
      name, email, password: hashedPassword, 
      department: department || 'CSE', 
      cgpa: cgpa || 0, 
      phone: phone || '', 
      year: year || 1, 
      role: 'student' 
    });
    await student.save();

    res.status(201).json({ success: true, message: 'Student added successfully', data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/admin/companies', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const companies = await Company.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/admin/companies', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ success: true, message: 'Company added successfully', data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/companies/:id', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    res.json({ success: true, message: 'Company updated successfully', data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/companies/:id', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    res.json({ success: true, message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).populate('company').sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('company');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const jobData = req.body;
    if (jobData.company) {
      const company = await Company.findById(jobData.company);
      jobData.companyName = company ? company.name : '';
    }
    const job = new Job(jobData);
    await job.save();
    res.status(201).json({ success: true, message: 'Job created successfully', data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, message: 'Job updated successfully', data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/admin/questions', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const questions = await Question.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/admin/questions', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ success: true, message: 'Question added successfully', data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/admin/questions/:id', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    res.json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/notifications', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({ success: true, message: 'Notification created successfully', data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/notifications/:id', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/tests', async (req, res) => {
  try {
    const tests = await Test.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: tests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/tests', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const test = new Test(req.body);
    await test.save();
    res.status(201).json({ success: true, message: 'Test created successfully', data: test });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/tests/:id', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found' });
    }

    res.json({ success: true, message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/admin/applications', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const applications = await Application.find({ isActive: true })
      .populate('student', 'name email department cgpa')
      .populate('job', 'title company')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/applications/:id/status', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, message: 'Application status updated successfully', data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/admin/reports', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const reports = await Report.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/admin/reports/generate', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const { type, department, fromDate, toDate } = req.body;
    let data = {};

    if (type === 'placement') {
      const totalStudents = await User.countDocuments({ role: 'student' });
      data = { totalStudents, placedStudents: 0, placementRate: '0%' };
    } else if (type === 'student') {
      const students = await User.find({ role: 'student' }).select('-password');
      data = { total: students.length, students };
    } else if (type === 'company') {
      const companies = await Company.find({});
      data = { total: companies.length, companies };
    }

    const report = new Report({ type, department, fromDate, toDate, data });
    await report.save();

    res.json({ success: true, message: 'Report generated successfully', data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/admin/profile', async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/profile', async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(decoded.id, { name, email }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/admin/dashboard', async (req, res) => {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCompanies = await Company.countDocuments({ isActive: true });
    const totalJobs = await Job.countDocuments({ isActive: true });
    const totalQuestions = await Question.countDocuments({ isActive: true });
    const totalTests = await Test.countDocuments({ isActive: true });
    const totalApplications = await Application.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalCompanies,
          totalJobs,
          totalQuestions,
          totalTests,
          totalApplications
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get('/api/test', (req, res) => {
  res.json({ success: true, message: '✅ API is working!', timestamp: new Date().toISOString() });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route ' + req.method + ' ' + req.url + ' not found' });
});


app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ success: false, message: 'Something went wrong!', error: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n🚀 Server running on port ' + PORT);
  console.log('📍 API URL: http://localhost:' + PORT + '/api');
  console.log('🧪 Test URL: http://localhost:' + PORT + '/api/test\n');
  console.log('📚 Available endpoints:');
  console.log('  🔐 Auth: /api/auth/login, /api/auth/register');
  console.log('  👤 Admin Students: /api/admin/students (GET, POST)');
  console.log('  🏢 Companies: /api/admin/companies (GET, POST, PUT, DELETE)');
  console.log('  💼 Jobs: /api/jobs (GET, POST, PUT, DELETE)');
  console.log('  ❓ Questions: /api/admin/questions (GET, POST, DELETE)');
  console.log('  🔔 Notifications: /api/notifications (GET, POST, DELETE)');
  console.log('  📝 Tests: /api/tests (GET, POST, DELETE)');
  console.log('  📄 Applications: /api/admin/applications (GET, PUT)');
  console.log('  📊 Reports: /api/admin/reports (GET, POST)');
  console.log('  👤 Profile: /api/admin/profile (GET, PUT)');
  console.log('  📈 Dashboard: /api/admin/dashboard (GET)\n');
});