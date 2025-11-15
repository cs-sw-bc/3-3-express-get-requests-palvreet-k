const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// const HARD_CODED_JSON = {
//   results: [
//     {
//       name: {
//         title: "Miss",
//         first: "Jennie",
//         last: "Nichols",
//       },
//       email: "jennie.nichols@example.com",
//       dob: {
//         age: 30,
//       },
//     },
//   ],
// };

app.get("/", (req, res) => {
  res.send("Welcome to the Users API!");
});

app.get("/users", (req, res) => {
  // For now, we're using hardcoded JSON data
  // let randomUser = HARD_CODED_JSON.results[0];
  // res.json(randomUser);

  // TODO: Replace the hardcoded JSON with a real API request to get a random user
  // For example, you might use the `axios` library to make a GET request to the API endpoint

  fetch("https://randomuser.me/api")
    .then(res => res.json())
    .then(data => {
      const user = data.results[0];
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch user" });
    });

});


app.get("/health/:status", async (req, res) => {
  const status = req.params.status;
  if (status === "good") {
    res.status(200).json({ status: "Health is good" });
  }
  else {
    res.status(500).json({ status: "Health is bad" });
  }

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
