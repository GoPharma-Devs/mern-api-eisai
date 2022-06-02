const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { config } = require('../config/index');
const Role = require('../models/role');

exports.signUp = async (req, res) => {
  const { firstname, lastname, username, email, password, rooms, roles } =
    req.body;
  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password: await User.encryptPassword(password),
    rooms,
  });
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(409)
      .send({ message: 'User with given email already Exist!' });
  }
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: 'user' });
    newUser.roles = [role._id];
  }
  const savedUser = await newUser.save();
  const newToken = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.status(200).json({ newToken });
};

exports.logIn = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email }).populate(
    'roles'
  );
  if (!userExist)
    return res.status(400).json({
      message: 'User not exists',
    });
  const matchPassword = await User.comparePassword(
    req.body.password,
    userExist.password
  );
  if (!matchPassword)
    return res.status(401).json({
      token: null,
      message: 'Invalid password',
    });
  const token = jwt.sign({ id: userExist._id }, config.SECRET, {
    expiresIn: 86400,
  });
  return res.json({
    _id: userExist._id,
    username: userExist.username,
    roles: userExist.roles,
    rooms: userExist.rooms,
    message: 'Auth succesful',
    token: token,
  });
};
