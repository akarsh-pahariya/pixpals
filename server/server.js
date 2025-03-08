const dotenv = require('dotenv');
const { mongoose } = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((error) => console.log('Error connecting to the database'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port = ${port}`);
});
