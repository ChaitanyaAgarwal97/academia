const log4js = require("log4js");

log4js.configure({
  appenders: {
    stdout: { type: "stdout" },
  },
  categories: {
    default: { appenders: ["stdout"], level: "info" },
  },
});

exports.logger = log4js.getLogger();
