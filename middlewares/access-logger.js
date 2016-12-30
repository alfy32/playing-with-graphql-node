const logger = require('metric-log').context({logger: "access"});
const uuid = require('node-uuid');

module.exports = function (req, res, next) {
  if (req.path == '/healthcheck/heartbeat') {
    next();
    return;
  }

  const accessLog = res.locals.accessLog = {};

  accessLog.time = new Date().toISOString();
  accessLog.method = req.method;
  accessLog.path = req.path;
  accessLog.query = req.query;
  accessLog.status = res.statusCode;
  accessLog.rid = uuid.v4();

  const start = Date.now();
  const originalResEnd = res.end;
  res.end = function (chunk, encoding) {

    res.end = originalResEnd;
    res.end(chunk, encoding);

    accessLog.duration = Date.now() - start;

    logger(accessLog);
  };

  next();
};