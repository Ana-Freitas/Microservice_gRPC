const { Router } = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const router = Router();
router.get('/users/:id', UserController.show);
router.get('/users', UserController.store);
router.post('/sessions', SessionController.store);
router.post('/users/registerUser', UserController.store)

module.exports = router;