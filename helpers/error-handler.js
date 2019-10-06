module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    // custom application error
    return reply.code(400).send({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return reply.code(401).send({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return reply.code(500).send({ message: err.message });
}
