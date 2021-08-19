const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const userSchema = new mongoose.Schema({
    id: Number,
    email: String,
    username: String,
    password: String
});


userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next();
    
    this.password = await bcrypt.hash(this.password,8);
});

userSchema.methods = {
    compareHash(hash) {
        return bcrypt.compare(hash, this.password);
    },
};

userSchema.statics = {
    generateToken( { id } ){
        return jwt.sign( { id }, authConfig.secret, {
            expiresIn: authConfig.expireIn,
        });
    }
};

module.exports = mongoose.model('User', userSchema);