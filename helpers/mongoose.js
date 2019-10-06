const mongoose = require('mongoose');

module.exports = {
  async mongooseConnect(mongoUrl) {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    const connection = await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection
      .once('open', () => {
        console.log('mongoose connection is good to go');
      })
      .on('error', error => {
        console.log('this is the warning to the warning!');
        console.warn('Warning', error);
      });

    return connection;
  }
};
