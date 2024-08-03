const express = require('express');
const app = express();
const sequelize = require('./config/dbConfig');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');

require('dotenv').config(); 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync().then(() => {
    console.log('Database synchronized');
  }).catch(err => {
    console.error('Error synchronizing database:', err);
  });

  const PORT = process.env.PORT || 3000;
  app.use('/api', userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});