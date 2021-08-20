const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});


UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next();
    
    this.password = await bcrypt.hash(this.password,8);
});

UserSchema.methods = {
    compareHash(hash) {
        return bcrypt.compare(hash, this.password);
    },
};

UserSchema.statics = {
    generateToken( { id } ){
        return jwt.sign( { id }, authConfig.secret, {
            expiresIn: authConfig.expireIn,
        });
    }
};

module.exports = mongoose.model('User', UserSchema);