const cisPublicApiService = require('./../libs/service/cis-public-api-service');

module.exports = (req, res, next) => {
  res.locals.sessionId = getSessionFromRequest(req);

  if (!res.locals.sessionId) {
    return res.status(401).json(createErrorResponseJson('Missing Session Id'));
  }

  cisPublicApiService.getSessionPromise(req, res)
    .then((identity) => {
      res.locals.user = identity.users[0];

      next();
    })
    .catch((error) => {
      return res.status(401).json(createErrorResponseJson(error));
    });
};

function createErrorResponseJson(message) {
  return {
    errors: [
      {
        message: message
      }
    ]
  }
}

function getSessionFromRequest(req) {
  let sessionId;

  sessionId = req.query.sessionId;
  if (sessionId) {
    return sessionId;
  }

  sessionId = parseAuthorizationHeader(req);
  if (sessionId) {
    return sessionId;
  }

  sessionId = req.cookies.fssessionid;
  if (sessionId) {
    return sessionId;
  }

  return undefined;
}

function parseAuthorizationHeader(req) {
  const values = req.header("Authorization");

  if (values) {
    for (let value of values.split(", ")) {
      if (value.match(/Bearer/i)) {
        return value.replace(/Bearer/i, '').trim();
      }
    }
  }

  return undefined;
}
