// Import required modules
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//dummy data
let users = [
  {
    id: "1",
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching"
  } 
  
,
{
  id: "2",
  firstName: "Neha",
  lastName: "Sharma",
  hobby: "Coding"
},
{
  id: "3",
  firstName: "Jane",
  lastName: "Doe",
  hobby: "Reading"
} 
,
{
  id:"4",
  firstName: "Jack",
  lastName: "Doe",
  hobby: "Singing"
},

]; 


// Routes

// GET /users - Fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Fetch user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
if (user) {
  res.json(user);
} else {
  res.status(404).json({ error: "User not found" });
}
});

// POST /user - Add a new user
app.post('/user', (req, res) => {
  const { firstName, lastName, hobby } = req.body;
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newUser = {
    id: (users.length + 1).toString(),
    firstName,
    lastName,
    hobby
  };
  users.push(newUser);
  res.status(201).json(newUser);
});



   // PUT /user/:id - Update user by ID
app.put('/user/:id', (req, res) => {
  // Extract the user ID from the URL parameters
  const { id } = req.params;

  // Extract the updated user details from the request body
  const { firstName, lastName, hobby } = req.body;

  // Find the user with the matching ID in the users array
  const user = users.find(u => u.id === id);

  // If the user is not found, return a 404 error
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Validate the updated user details
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Update the user details
  user.firstName = firstName;
  user.lastName = lastName;
  user.hobby = hobby;

  // Return the updated user details
  res.json(user);
});


// DELETE /user/:id - Delete user by ID
app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const deletedUser = users.splice(index, 1);
  res.json(deletedUser);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
