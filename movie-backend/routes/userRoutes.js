const express = require('express');
const { getUser, login, logout, register } = require('../controllers/userController');
const { validateRegisterRequest, validateLoginRequest } = require('../validations/validationSchema');
const { addFavorite, removeFavorite, getfavorite } = require('../controllers/movieController');

const router = express.Router();
router.post("/register",validateRegisterRequest,register)
router.post("/login",validateLoginRequest,login)
router.get("/logout",logout)
router.get("/getuser", getUser)
router.post("/addfavorite", addFavorite)
router.post("/removefavorite", removeFavorite)
router.get("/getfavorite",getfavorite)

module.exports = router;