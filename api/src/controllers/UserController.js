const HydraService = require('../services/hydra');

class UserController {
    async show(req, res) {
        const user = {};

        return user;
    }

    async store(req, res){

        console.log(req.body);
        const { email, username, password } = req.body;

        const user =   { email, username, password }

        HydraService.registerUser(user, function (err, response) {
            if(err){
                console.log(err);
            }else{
                console.log(response);
            }
        })
        return res.send('Uhuuu');
    }
}

module.exports = new UserController();