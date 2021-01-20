const { format } = require("date-fns");

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}: ${format(
      new Date(),
      "dd/MM/yyyy"
    )}`
  );
  next();
};

module.exports = logger;
