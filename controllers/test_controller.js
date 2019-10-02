// Dependencies

// Models

module.exports = {
  // get test
  test(req, res, next) {
    res.send({ test: "plz work" });
  },

  // test reflection of a posted json message
  reflect(req, res, next) {
    res.send(req.body);
  }
};
