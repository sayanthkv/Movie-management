require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./Config/db");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.use(cors());
app.use(express.json());

app.use("/movie", movieRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});