// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get("/info", (req, res) => res.sendFile(__dirname + "/views/info.html"));

// your first API endpoint...
app.get("/api/hello", (req, res) => res.json({ greeting: "hello API" }));

// default endpoint returns the current date
app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// returns the date for the param provided
app.get("/api/timestamp/:date_string", (req, res) => {
  const { date_string } = req.params;
  const date = new Date(date_string);

  // for unix timestamps
  if (/\d{5,}/.test(date_string)) {
    const unixDate = new Date(parseInt(date_string));
    return res.json({
      unix: unixDate.getTime(),
      utc: unixDate.toUTCString(),
    });
  }

  // for utc timestamps
  if (date.toString() === "Invalid Date")
    return res.json({ error: "Invalid Date" });
  else return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () =>
  console.log("Your app is listening on port " + listener.address().port)
);
