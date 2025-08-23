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