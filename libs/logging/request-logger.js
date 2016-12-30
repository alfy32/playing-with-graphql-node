const logger = require('metric-log').context({logger: "request"});

/**
 * This is built to log the requests that are requested with 'node-fetch'.
 *
 * @param response The fetch response.
 * @param startTime The time the fetch request was started.
 * @param locals The locals for the request. ex res.locals
 * @param opts The opts that will be passed to fetch
 */
module.exports = (response, startTime, locals, opts = {}) => {
  const logObject = {
    time: new Date().toISOString(),
    method: opts.method,
    url: response.url,
    status: response.status
  };

  if (startTime) {
    logObject.duration = Date.now() - startTime;
  }

  if (locals) {
    logObject.rid = locals.accessLog.rid;
  }

  logObject.headers = opts.headers;

  logger(logObject);
};