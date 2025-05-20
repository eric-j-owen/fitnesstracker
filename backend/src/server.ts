import app from "./app.js";
import AppDataSource from "./db/data-source.js";

const PORT = Number(process.env.PORT) || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
