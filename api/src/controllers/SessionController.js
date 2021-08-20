
const HydraService = require('../services/hydra');

class SessionController {
    async store(req, res){

        const { email, username, password } = req.body;
        const user =  { user: { email, username, password } };

        console.log({ email, username, password })
       HydraService.loginUser(user,  (err, response) => {
           if(response){
               console.log(response);
           }else{
            console.log(err);
           }
       })
       //});
         return res.json("Error");
    }
}
module.exports = new SessionController();