require('dotenv').config();
const app = require('./src/app');
const port = 3000;



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  