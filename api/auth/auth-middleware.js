const User = require("../users/user-model");

const checkUserAndPass = (req, res, next) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
  }
};

const checkUsername = (req, res, next) => {
  const { username } = req.body;
  User.findBy({ username })
    .then(([user]) => {
      if (user) {
        next({ status: 422, message: "username taken" });
      } else {
        next();
      }
    })
    .catch(next);
};

const checkUserCred = (req, res, next) => {
  const { username } = req.body;
  User.findBy({ username })
    .then(([user]) => {
      if (!user) {
        next({ status: 401, message: "invalid credentials" });
      } else {
        next();
      }
    })
    .catch(next);
};

module.exports = {
  checkUserAndPass,
  checkUsername,
  checkUserCred,
};
