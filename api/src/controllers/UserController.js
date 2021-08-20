const HydraService = require('../services/hydra');

class UserController {
    async show(req, res) {
        const { id } = req.params;

        const response = await new Promise((resolve, reject) => {
            HydraService.getUserById({ id }, function (err, response) {
                if(err){
                    reject(err);
                }else{
                    resolve(response);
                }
            })
        })

        return res.json(response);
    }

    async store(req, res){
        const { email, username, password } = req.body;
        const user =   { email, username, password }

        const response = await new Promise((resolve, reject) => {
            HydraService.registerUser(user, function (err, response) {
                if(err){
                    reject(err);
                }else{
                    resolve(response);
                }
            })
        })

        return res.json(response);
    }
    
}

module.exports = new UserController();