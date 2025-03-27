import app from "./app.js";
import { query } from "./db/index.js";

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
