const mongoose = require("mongoose");
const app = require("./app");

const DB_URL = "mongodb://localhost:27017/image-app-db";
const PORT = 3000;

// Setup db connection
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.error("Error occurred while connecting to DB!");
    } else {
      console.log("Database connection established successfully");
    }
  }
);

// Run the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
