const { logEvents } = require("./logEvents");

const errHandlers = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  res.status(500).send(err.message);
};

module.exports = errHandlers;
