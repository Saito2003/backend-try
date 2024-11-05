const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello World! This is my Node.js backend.');
});

// Sample data
let items = [
  { id: 1, name: 'Item 1', price: 10.99 },
  { id: 2, name: 'Item 2', price: 12.99 },
];

// Test route
app.get('/', (req, res) => {
  res.send('Hello World! This is my Node.js backend.');
});

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Get an item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found.');
  res.json(item);
});

// Create a new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an existing item
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found.');

  item.name = req.body.name;
  item.price = req.body.price;
  res.json(item);
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found.');

  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
