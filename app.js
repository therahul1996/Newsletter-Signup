const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);
  const options = {
    url: `https://us14.api.mailchimp.com/3.0/lists/${process.env.REACT_APP_UNIQUE_ID}`,
    method: "POST",
    headers: {
      Authorization: `rahulSahu007 ${process.env.REACT_APP_API_KEY}`,
    },
    body: jsonData,
  };
  request(options, function (error, response, body) {
    if (error) {
      console(error);
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
  //   console.log(firstName, lastName, email);
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 9000, function () {
  console.log("Server is running port 9000");
});
