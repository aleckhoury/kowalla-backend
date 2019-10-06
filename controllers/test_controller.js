// Dependencies

// Models

module.exports = {

  // get test
  test(request, reply) {
    reply.send({ test: 'plz work' });
  },

  // test reflection of a posted json message
  reflect(request, reply) {
    reply.send(request.body);
  },
}
