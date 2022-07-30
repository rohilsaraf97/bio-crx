import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dataSchema from "./utils/zodSchema";
import validate from "./middlewares/schemaValidation";
import parseDb from "./middlewares/checkDb";
import bionify from "./controllers/bionify";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  cors({
    origin: "*",
  })
);

app.post("/bionify", validate(dataSchema), parseDb, bionify);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
