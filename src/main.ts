import dotenv  from 'dotenv';
import express from "express";

dotenv.config({path: '.env'});
const app = express();

app.use('/hello', (req, res) => {
  res.json({
    hello: 'world'
  });
})

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`started server on http://127.0.0.1:${PORT}`);
});