const NixService = require('../services/nix');

class PurchaseController {
    async show(req, res) {
        const { id } = req.params;

        const response = await new Promise((resolve, reject) => {
            NixService.getPurchaseById({ id }, function (err, response) {
                if(err){
                    reject(err);
                }else{
                    resolve(response);
                }
            })
        })

        return res.json(response);
    }

    async index(req, res) {
        const response = await new Promise((resolve, reject) => {
            NixService.listPurchase({ userId: req.userId }, function (err, response) {
                if(err){
                    reject(err);
                }else{
                    resolve(response);
                }
            })
        })

        return res.json(response);
    }

    async store(req, res) {
        const { userId } = req; 
        const { title, value } = req.body;

        const response = await new Promise((resolve, reject) => {
            NixService.purchase({ purchase: { title, value, userId } }, function (err, response) {
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

module.exports = new PurchaseController();