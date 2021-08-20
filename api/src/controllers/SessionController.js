
const HydraService = require('../services/hydra');

class SessionController {
    async store(req, res){

        const { email, username, password } = req.body;
        const user =  { user: { email, password } };

        const response = await new Promise((resolve, reject) => {
            HydraService.loginUser(user,  (err, response) => {
                if(response){
                    resolve(response);
                }else{
                    reject(err);
                }
            })
        })

         return res.json(response);
    }
}
module.exports = new SessionController();