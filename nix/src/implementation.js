const Purchase = require('./models/Purchase');

module.exports = {
    async getPurchaseById(call, callback){
        const { id } = call.request;
        const response = await Purchase.findById(id);
        return callback(null, { purchase: response });
    },

    async listPurchase (call, callback)  {
        const { userId } = call.request;

        const purchases = await Purchase.find({ userId });

        return callback(null, { purchases });
    },

    async purchase (call, callback) {
        const { title, value, userId } = call.request.purchase;
        const purchase = await Purchase.create({ userId, title, value  })
        return callback(null, { purchase: { ...purchase.toObject(), id: purchase._id }});
    }
}