const logger = require('metric-log').context({logger: "request"});

/**
 * This is built to log the requests that are requested with 'node-fetch'.
 *
 * @param response The fetch response.
 * @param startTime The time the fetch request was started.
 * @param locals The locals for the request. ex res.locals
 */
module.exports = (response, startTime, locals) => {
  const logObject = {
    time: new Date().toISOString(),
    url: response.url,
    status: response.status
  };

  if (startTime) {
    logObject.duration = Date.now() - startTime;
  }

  if (locals) {
    logObject.rid = locals.accessLog.rid;
  }

  logger(logObject);
};