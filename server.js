const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const path = require('path');

const PORT = 5000;

app.use(cors({
  origin: "*",
}))

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  secret: 'secret',
  saveUninitialized: true
}));

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/form', (req, res) => {
  const formData = req.body;
  console.log(formData);
  res.status(200).send(formData);
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
})

const users = {
  user1: '1234567',
  user2: '123456'
};

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (users[username] && users[username] === password) {
    req.session.username = username;
    return res.status(200).json({ message: `Success! Wellcome back ${username}!` });
  } else {
    res.status(401).json({ message: 'Invalid authentication!' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500);
    }
    res.status(200);
  });
});

app.get('/user', (req, res) => {
  if (req.session.username) {
    return res.status(200).json({ username: req.session.username });
  } else {
    return res.status(200).json(null);
  }
});

app.use((req, res, next) => {
  res.status(404).render('not-found.ejs', {
    name: "unknown",
    reasons: ["Wrong url entered in searchbar", "Broke link within this website"]
  });
});

app.listen(PORT, () => {
  console.log('Server is starting...');
})