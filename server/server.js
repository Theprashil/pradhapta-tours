const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT;
const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');

    app.listen(port, () => {
      console.log(`App connected in port ${port}`);
    });
  });

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
});
