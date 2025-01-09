// utils/passwordUtils.js

const bcrypt = require('bcryptjs');

// Function to verify password
exports.verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
