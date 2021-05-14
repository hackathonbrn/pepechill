const usernameRegexp = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/;
const passwordRegexp = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-z\dА-Яа-я]{8,}$/;
/**
 *  Validates username
 *
 * @param {String} data - username
 * @returns {boolean}
 */
function usernameValidate(data) {
  return usernameRegexp.test(data);
}

/**
 *
 * @param {String} data - password
 * @returns {boolean}
 */
function passwordValidate(data) {
  return passwordRegexp.test(data);
}

module.exports = {
  usernameValidate,
  passwordValidate,
};
