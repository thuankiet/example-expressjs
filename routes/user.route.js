const express = require('express');

const controller = require('../controllers/user.controller'); // Import callback function từ file user.controller
const validate = require('../validate/user.validate'); // Kiểm trả bên trong input 
const authMiddleware = require('../middlewares/auth.middleware'); 

const router = express.Router();

router.get('/', controller.index); // controller.index = module.exports.index bên user.controller
// authMiddleware.requireAuth đặt trước kiểm tra nếu người dùng chưa login thì sẽ không đc vào
router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send('Hello');
})

router.get('/search', controller.search); 

router.get('/create', controller.create); 

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;