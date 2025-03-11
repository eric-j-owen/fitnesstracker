import app from "./app.ts";

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => console.log("server listening"));
