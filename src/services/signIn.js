const User = require('../models/singnUpModel');
const { decrypt } = require('../utils/crypto');
const { emailValidation, passwordValidation } = require('../utils/validations');
const { sendResponse } = require('../utils/clientjsonmaker');
const signIn = async (req, res) => {

  const { email, password } = req.body;
  var decryptedData = [];
  try {
    if (email.length > 0 && password.length > 0) {
      if (!emailValidation(email)) {
        return sendResponse(res, 400, "Invalid email format")
      }
      else if (!passwordValidation(password)) {
        return sendResponse(res, 400, "Invalid password format")
      }
      else {
        const users = await User.find({});
        if (users && users.length > 0) {

          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.key && user.data) {
              try {
                const decrypted = await decrypt(user.data, user.key);
                decryptedData.push(JSON.parse(decrypted));
              } catch (error) {
                return sendResponse(res, 400, `Error decrypting user data for User ${user._id}: ${error}`)
              }
            } else {
              return sendResponse(res, 400, `User ${user._id} has missing IV or encrypted data.`)
            }
          }
        }
        else {
          return sendResponse(res, 400, 'User not found')
        }
        if (decryptedData && decryptedData.length > 0) {
          for (let i = 0; i < decryptedData.length; i++) {
            if (decryptedData[i].email === email && decryptedData[i].password === password) {

              return setTimeout(() => {
                sendResponse(res, 200, 'Login successfully', {
                  email: decryptedData[i].email,
                  mobile: decryptedData[i].mobile,
                  password: decryptedData[i].password,
                });
              }, 1000)
            }
            else if (decryptedData[i].email === email && decryptedData[i].password !== password) {

              return sendResponse(res, 400, ' Invalid password')
            }
            else if (decryptedData[i].email !== email && decryptedData[i].password === password) {
              return sendResponse(res, 400, ' Invalid email')
            }
            else {
              return sendResponse(res, 400, ' Invalid email and mobile number')
            }
          }
        }
      }
    }
    else {
      return sendResponse(res, 400, ' Invalid JSON or missing fields')
    }
  } catch (error) {
    console.log(error.message)
    return sendResponse(res, 500, error.message)
  }
};
module.exports = signIn;
