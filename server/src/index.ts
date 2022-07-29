import express, { Request, Response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

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

app.post("/bionify", (req: Request, res: Response) => {
  const { htmlBody, fixation, saccade } = req.body;
  const encodedParams = new URLSearchParams();
  encodedParams.append("content", htmlBody);
  encodedParams.append("response_type", "html");
  encodedParams.append("request_type", "html");
  encodedParams.append("fixation", fixation);
  encodedParams.append("saccade", saccade);

  const options = {
    method: "POST",
    url: "https://bionic-reading1.p.rapidapi.com/convert",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST!,
    },
    data: encodedParams,
  };

  axios
    .request(options)
    .then(function (response) {
      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error);
    });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
