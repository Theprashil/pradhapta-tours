const mongoose = require('mongoose');
const app = require('./app');

require('dotenv').config();

const port = process.env.PORT;
const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db).then(() => {
  console.log('Database Connected');

  app.listen(port, () => {
    console.log(`App connected in port ${port}`);
  });
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
});
