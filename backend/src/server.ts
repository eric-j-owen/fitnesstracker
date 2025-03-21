import app from "./app.js";
import { query } from "./db/index.js";

const PORT = Number(process.env.PORT) || 3001;
query("SELECT 1")
  .then(() => {
    console.log("db connection test success");
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
  })
  .catch(console.error);
