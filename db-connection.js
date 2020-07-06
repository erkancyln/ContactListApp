const mongoose = require('mongoose');

module.exports = () => {
  const db = 'mongodb+srv://dbUser:dbPassword@cluster0-6ehlt.mongodb.net/sample_airbnb?ssl=true&authSource=admin';
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`DB Connected to ${db}...`);
  })
  .catch((err) => {
    /* istanbul ignore next */
    console.error("DB not connected: " + err.message);
  });
};
