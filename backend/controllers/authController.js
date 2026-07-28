const User = require("../models/User");


exports.studentSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "This email is already registered!" });
        }

        const role = email === "admin@prep.com" ? "admin" : "student";
        const newUser = new User({ name, email, password, role });

        await newUser.save();
        
        return res.status(201).json({ message: "Identity registered successfully! 🎉" });

    } catch (err) {
        console.error("🚨 SIGNUP ERROR:", err);
        return res.status(500).json({ error: "Internal server error during signup!" });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Account not found!" });
        }

        
        let isMatch = false;
        if (user.comparePassword && typeof user.comparePassword === 'function') {
            isMatch = await user.comparePassword(password);
        } else {
            isMatch = (user.password === password);
        }

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password!" });
        }

       
        const responseData = {
            message: "Verify Identity Success! 🚀",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        };

        return res.status(200).json(responseData);

    } catch (err) {
        console.error("🚨 LOGIN ERROR:", err);
        return res.status(500).json({ error: "Internal server error during login!" });
    }
};