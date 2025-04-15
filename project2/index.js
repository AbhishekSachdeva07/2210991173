const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
