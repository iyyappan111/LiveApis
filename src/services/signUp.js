const User = require('../models/singnUpModel');
const { encrypt, generateRandomIV, decrypt, generateRandomKey } = require('../utils/crypto');
const { nameValidation, emailValidation, mobileValidation, passwordValidation } = require('../utils/validations');
const { sendResponse } = require('../utils/clientjsonmaker');
const signUp = async (req, res) => {
  try {
    const { password, confirmPassword, firstName, lastName, email, mobile } = req.body;

    if (!firstName || !lastName || !email || !mobile || !password || !confirmPassword) {
      return sendResponse(res, 400, "Invalid JSON or missing fields")
    }


    if (!nameValidation(firstName) || !nameValidation(lastName)) {
      return sendResponse(res, 400, 'Invalid name format')
    }


    if (!emailValidation(email)) {
      return sendResponse(res, 400, 'Invalid email format')
    }


    if (!mobileValidation(mobile)) {
      return sendResponse(res, 400, 'Invalid mobile number format')
    }


    if (!passwordValidation(password)) {
      return sendResponse(res, 400, 'Invalid password format')
    }

    if (password !== confirmPassword) {
      return sendResponse(res, 400, 'Passwords do not match')
    }

    try {
      const users = await User.find({});
      const decryptedData = [];

      for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.key && user.data) {
          try {
            const decrypted = await decrypt(user.data, user.key);
            decryptedData.push(JSON.parse(decrypted));
          } catch (error) {
            return sendResponse(res, 400, ' `Error decrypting user data for User ${user._id}: ${error}`')
          }
        } else {
          return sendResponse(res, 400, '`User ${user._id} has missing IV or encrypted data.`')
        }
      }

      if (decryptedData && decryptedData.length > 0) {
        for (i = 0; i < decryptedData.length; i++) {
          if (decryptedData[i].email == email && decryptedData[i].mobile !== mobile) {
            return sendResponse(res, 400, "Email already taken")
          } else if (decryptedData[i].email !== email && decryptedData[i].mobile == mobile) {
            return sendResponse(res, 400, 'Mobile already taken')
          } else if (decryptedData[i].email == email && decryptedData[i].mobile == mobile) {
            return sendResponse(res, 400, "Email and Mobile Number already taken")

          }
          else {
            const jsonData = JSON.stringify({ firstName, lastName, email, mobile, password });
            const iv = await generateRandomIV();
            const key = await generateRandomKey();
            const encryptedData = await encrypt(jsonData, iv, key);
            const newData = new User({
              key: key,
              data: encryptedData
            });
            await newData.save();
            return sendResponse(res, 200, 'Registration successfully')
          }
        }
      }

      const jsonData = JSON.stringify({ firstName, lastName, email, mobile, password });
      const iv = await generateRandomIV();
      const key = await generateRandomKey();
      const encryptedData = await encrypt(jsonData, iv, key);

      const newData = new User({
        key: key,
        data: encryptedData
      });
      await newData.save();
      return sendResponse(res, 200, 'Registration successfully')
    } catch (error) {
      console.log(error);
      return sendResponse(res, 400, "Error while processing the request")
    }
  } catch (error) {
    return sendResponse(res, 400, error.message)
  }
};

module.exports = signUp;
