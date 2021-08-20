const User = require('./models/User');

module.exports = {

    async getUserById(call, callback){
        const { id } = call.request; 
        const user = await User.findById(id);

        return callback(null, { user });
    },

    async registerUser(call, callback){

        const { email, username, password} = call.request;
        const user = await User.create({ email, username, password });
        
        return callback(null, { user });
    },

    async loginUser(call, callback){
        
        console.log('Request' + JSON.stringify(call.request));

        const { email, username, password } = call.request.user;


        console.log({ email, username, password } );
        const user = await User.findOne( { email })

        console.log('Uusiario' + user);
        if(!user){
            return callback(null, { token: 'User not found' } )
        }

        if(!await user.compareHash(password)) {
            return callback(null, { token: 'Invalid password' } )
        }

        return callback(null, { token: User.generateToken(user) } )
    }
}