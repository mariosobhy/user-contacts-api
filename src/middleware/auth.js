const users = require("../models/user");
const _ = require("underscore");

const auth = async (req, res, next) => {
  let userRequested = {
    authorization: req.body.authorization,
    deviceToken: req.body.deviceToken,
    fingerPrint: req.body.fingerPrint,
  };
  //ToDo refactoring 
  userRequested = _.find(users, (_user) => {
    if (
      _user["authorization"] === userRequested["authorization"] &&
      _user["deviceToken"] === userRequested["deviceToken"] &&
      _user["fingerPrint"] === userRequested["fingerPrint"]
    ) {
      return _user;
    }
  });
  if (userRequested) {
    req.body.userId = userRequested.id;
    next();
  } else {
    res.status(401).send({
      message: "Unauthorized user!.",
    });
  }
};

module.exports = auth;