const User = require('../models/userSchema');
const sendToken = require('../utils/jwtTokens');
const statusCodes = require('../validations/statusCodes');
const messages = require('../validations/messageDefault');

const register = async (req, res) => {
  const { username, password, email, name } = req.body;
  
  if (!username || !password || !email || !name) {
    return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.PROVIDE_VALUES });
  }

  try {
    // Check if the username is already registered
    const isUser = await User.findOne({ where: { username: username } });
    if (isUser) {
      return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.USER_EXISTS});
    }

    // Create the user
    const user = await User.create({ username, password, email, name });
    sendToken(user, statusCodes.CREATED, res, messages.REGISTER_SUCCESS);

  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.INTERNAL_SERVER_ERROR});
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.PROVIDE_VALUES });
  }

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.INVALID_CREDENTIALS });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(statusCodes.BAD_REQUEST).json({ success: false, message: messages.INVALID_CREDENTIALS });
  }

  sendToken(user, statusCodes.OK, res,messages.LOGIN_SUCCESS);
};

const logout = async (req, res) => {
  res.status(statusCodes.OK).cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: messages.LOGOUT_SUCCESS,
  });
};

const getUser = async (req, res) => {
  const user = req.user;
  res.status(statusCodes.OK).json({
    success: true,
    user,
  });
};

module.exports = {
  register,
  login,
  logout,
  getUser
};