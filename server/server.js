import app from "./src/app.js";
import dotevn from "dotenv";
import dbConnection from "./src/config/dbConnection.js";

dotevn.config();

const port = process.env.PORT || 5001;

app.listen(port, () => {
  dbConnection();
  console.log(`Server is running at http://localhost:${port}`);
});
