
const HydraService = require('../services/hydra');

class SessionController {
    async store(req, res){

        const { email, username, password } = req.body;
        const user =  { user: { email, username, password } };

        console.log({ email, username, password })

        const response = new Promise((resolve, reject) => {
            HydraService.loginUser(user,  (err, response) => {
                if(response){
                    resolve(response);
                    console.log(response);
                }else{
                    reject(err);
                 console.log(err);
                }
            })
        })

       //});
         return res.json(response);
    }
}
module.exports = new SessionController();