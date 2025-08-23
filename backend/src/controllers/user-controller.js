const generateToken = require('../libs/generateToken');
const userModel = require('../models/userModel');
const Validator = require('validatorjs');
const TryCatch = require('../utils/TryCatch');

class UserController {

    static Create = TryCatch(async (req, res) => {
        let rules = {
            'name': 'required|string',
            'email': 'required|string',
            'password': 'required|string',
        };
        let validation = new Validator(req.body, rules);
        const isValidData = validation.passes();
        if (!isValidData) {
            let errorResponse = {};
            for (let key in rules) {
                const error = validation.errors.get(key);
                if (error.length) {
                    errorResponse[key] = error;
                }
            }
            return res.status(400).json(errorResponse);
        }
        const { name, email, password, role } = req.body;
        const newUser = await userModel.create({
            name,
            email,
            password,
            role
        })
        generateToken(newUser, "User Registered", 200, res)
    })

    static login = TryCatch(async (req, res) => {
        let rules = {
            'email': 'required|string',
            'password': 'required|string',
        };
        let validation = new Validator(req.body, rules);
        const isValidData = validation.passes();
        if (!isValidData) {
            let errorResponse = {};
            for (let key in rules) {
                const error = validation.errors.get(key);
                if (error.length) {
                    errorResponse[key] = error;
                }
            }
            return res.status(400).json(errorResponse);
        }
        const { email, password, } = req.body;
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(200).json({ message: "Invalid email or password." });
        }
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(200).json({ message: "Invalid email or password." });
        }

        const token = generateToken(user, "User logged in successfully.", 200, res);
    })

    static logout = TryCatch(async (req, res) => {
        res.cookie("token", "", {
            expires: new Date(0), // Immediately expire the cookie
            httpOnly: true,
            secure: process.env.NODE_ENV === "development", // Use secure cookies in production
            sameSite: "strict",
        });

        res.status(200).json({
            success: true,
            message: "Logout Successfully.",
        });
    })
}
module.exports = UserController