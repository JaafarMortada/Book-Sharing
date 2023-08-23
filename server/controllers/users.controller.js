const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password, name } = req.body

  const is_user_existing = await User.findOne({ email });

  if (is_user_existing) {
    return res.send({ message: "Already have an account" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    name
  })

  try {
    await user.save();
    const { password: hashedPassword, ...userInfo } = user.toObject();
    const token = jwt.sign(userInfo, process.env.SECRET_KEY);

    return res.send({
      token,
      user: userInfo
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('An error occurred while creating the user: ' + error.message);
  }

}

module.exports = {
  register,
}