import app from "./app.js";
import { query } from "./db/index.js";

query("SELECT 1")
  .then(() => {
    console.log("db connection test success");
    app.listen(process.env.PORT, () =>
      console.log(`server listening on port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
