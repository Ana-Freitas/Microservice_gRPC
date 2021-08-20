const { Router } = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const PurchaseController = require('./controllers/PurchaseController');
const authMiddleware = require('./middleware/auth');

const router = Router();
router.get('/users/:id', UserController.show);
router.post('/sessions', SessionController.store);
router.post('/users/registerUser', UserController.store)

router.use(authMiddleware);

router.get('/purchases', PurchaseController.index);
router.get('/purchases/:id', PurchaseController.show);
router.post('/purchases', PurchaseController.store);



module.exports = router;