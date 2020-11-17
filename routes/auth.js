require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const posts = [
  {
    username: 'German',
    title: 'Postman 1',
  },
  {
    username: 'Rehan',
    title: 'Postman 2',
  },
  {
    username: 'Raven',
    title: 'Postman 3',
  },
];

router.get('/posts', authenticateToken, async (req, res) => {
  // To do
  return res
    .status(200)
    .json(posts.filter(post => post.username === req.user.name));
});

router.post('/login', (req, res) => {
  // To do
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return res.status(200).json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

module.exports = router;
