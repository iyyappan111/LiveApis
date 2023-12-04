const nameRegex = /^[A-Za-z ]+/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const mobileRegex = /^\d{10}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

const validate = (val, regex) => regex.test(val);

const nameValidation = (val) => {
  const trimmedValue = val.trim();
  return trimmedValue.length > 0 && validate(trimmedValue, nameRegex);
};

const emailValidation = (val) => {
  const trimmedValue = val.trim();
  return trimmedValue.length > 0 && validate(trimmedValue, emailRegex);
};

const mobileValidation = (val) => {
  const trimmedValue = val.trim();
  return trimmedValue.length > 0 && validate(trimmedValue, mobileRegex);
};

const passwordValidation = (val) => {
  const trimmedValue = val.trim();
  return trimmedValue.length > 0 && validate(trimmedValue, passwordRegex);
};
module.exports = { nameValidation, emailValidation, mobileValidation, passwordValidation };
