const HydraService = require('../services/hydra');

module.exports = async (req, res, next) => {
    try{
        const response = await new Promise((resolve, reject) => {
            HydraService.authenticate({ token: req.headers.authorization }, (err, response) => {              
                if(err || response.error){
                    reject(err || response.error);
                }else{
                    resolve(response);
                }
            })
        })
        
        req.userId = response.user.id;

        next();

    } catch(err){
        return res.status(401).send({ error: 'Token Invalid!'});
    }
}