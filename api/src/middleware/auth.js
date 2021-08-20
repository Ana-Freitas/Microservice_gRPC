const HydraService = require('../services/hydra');

module.exports = async (req, res, next) => {
    try{
        const response = await new Promise((resolve, reject) => {
            HydraService.authenticate(req.headers.authorization, (err, response) => {
                if(err){
                    reject(err);
                }else{
                    resolve(response);
                }
            })
        })
        req.userId = response.user.id;
        next();

    }catch(err){
        return res.status(401).send({ error: 'Token Invalid!'});
    }
}