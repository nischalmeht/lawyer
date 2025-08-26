const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Username must caontain at least 3 characters."],
        maxLength: [40, "Username cannot exceed 40 characters."],
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,           
        lowercase: true
    },
    password: {
        type: String,
        selected:false,
        minLength: [8, "Password must caontain at least 8 characters."],
        required: true
    },
      role: {
        type: String,
        enum: ["client", "lawyer"],
        default:"client"
      },
      profilePhoto: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
     
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        { id: this._id, },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
};
const User = mongoose.model('User', userSchema);
module.exports = User;