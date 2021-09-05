const { User } = require("../../models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("User does not exist");
      return res.status(404).json({ error: "Failed to login" });
    }

    const validPassword = await user.isCorrectPassword(password);

    if (!validPassword) {
      console.log("Invalid password");
      return res.status(404).json({ error: "Failed to login" });
    }

    req.session.save(() => {
      req.session.isLoggedIn = true;
      req.session.email = user.email;
      req.session.firstName = user.first_name;
      req.session.lastName = user.last_name;
      req.session.userId = user.id;
      req.session.username = user.username;
      return res.status(200).json({ success: "Login successful" });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Failed to login" });
  }
};

const logout = (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.destroy(() => {
      return res.status(200).json({ success: "Logout successful" });
    });
  } else {
    return res.status(500).json({ error: "Failed to logout" });
  }
};

const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;

    if (!first_name || !last_name || !email || !username || !password) {
      console.log(`[ERROR]: Unable to create a user`);
      return res.status(404).json({
        error: "Unable to create a user",
      });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      username,
      password,
    });

    if (!newUser) {
      return res.status(404).json({
        error: "Unable to create a user",
      });
    }

    res.status(200).json({ success: "user created" });
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
    res.status(500).json({
      error: "Failed to create user",
    });
  }
};

module.exports = { login, logout, signup };
