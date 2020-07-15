const express = require("express");
require("./db/mongoose");
const contactRouter = require('./routers/contact');

const app = express()
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(contactRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});