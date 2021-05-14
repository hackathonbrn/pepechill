const usernameRegexp = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/;
const passwordRegexp = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d]*$/;

export function passwordValidate(data) {
  return passwordRegexp.test(data);
}

export function usernameValidate(data) {
  return usernameRegexp.test(data);
}
