const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    deleteUser
} = require('../../controllers/userController');
module.exports = router;