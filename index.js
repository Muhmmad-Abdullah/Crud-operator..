const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

// Sample data - Username index.js
const users = [
  { id: 1, name: "Abdullah", address: "Lahore", email: "joni@gmail.com", education: "Mphil", number: "03224407061" },
  { id: 2, name: "Moazzma", address: "Karachi", email: "naao@gmail.com", education: "Phd", number: "03224407661" },
  { id: 3, name: "Asim", address: "Islamabad", email: "faoif@gmail.com", education: "BSCS", number: "03224407761" },
  { id: 4, name: "Shahri", address: "Chili", email: "joni@gmail.com", education: "Mphil", number: "03224407861" },
  { id: 5, name: "Aniya", address: "UK", email: "naao@gmail.com", education: "Phd", number: "03224407961" },
  { id: 6, name: "Alia", address: "USA", email: "faoif@gmail.com", education: "BSCS", number: "03224407361" },
  { id: 7, name: "Shazia", address: "Sindh", email: "joni@gmail.com", education: "Mphil", number: "03224407261" },
  { id: 8, name: "Uamir", address: "Kohat", email: "naao@gmail.com", education: "Phd", number: "03224407161" },
  { id: 9, name: "Ibrahim", address: "Kashmir", email: "faoif@gmail.com", education: "BSCS", number: "03224407561" },
  { id: 10, name: "Afzal", address: "KPK", email: "faoif@gmail.com", education: "BSCS", number: "03224407361" },
];
// Enable CORS
app.use(cors());

// home Page
app.get("/", (req, res) => {
  res.send("Hello This is my First Express js api program");
});

// Route to get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Route to get a specific user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



