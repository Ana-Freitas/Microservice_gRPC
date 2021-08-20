const User = require('./models/User');

module.exports = {

    async getUserById(call, callback){
        const { id } = call.request; 
        const user = await User.findById(id);

        return callback(null, { user: { ...user.toObject(), id: user._id, password: null } });
    },

    async registerUser(call, callback){

        const { email, username, password} = call.request;
        const user = await User.create({ email, username, password });

        console.log(JSON.stringify(user));
        return callback(null, { user: { ...user.toObject(), id: user._id } });
    },

    async loginUser(call, callback){
        const { email, password } = call.request.user;

        const user = await User.findOne( { email })

        if(!user){
            return callback(null, { error: 'User not found' } )
        }

        if(!await user.compareHash(password)) {
            return callback(null, { error: 'Invalid password' } )
        }

        return callback(null, { token: User.generateToken(user) } )
    }
}