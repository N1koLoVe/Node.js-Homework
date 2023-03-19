import express from "express";
import blogRouter from "./routes.js";

const app = express();

app.use(express.json());

app.use("/blogs", blogRouter);

app.listen(3000, () => {
  console.log("server up");
});
