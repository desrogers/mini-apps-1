var express = require('express');
var app = express();
var path = require('path');

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('checkout_db', 'root', 'plantlife', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  shippingAddress: {
    type: Sequelize.JSON
  },
  creditCard: {
    type: Sequelize.JSON
  }
})

User.sync({ force: true })

app.use('/', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/api/users', (req, res) => {
  res.send('HelloWorld');
});

app.post('/api/users', (req, res) => {
  User.create(req.body)
    .then(() => User.findOrCreate({ where: { name: req.body.name } }))
    .then(([user, created]) => {
      res.send(user);
    })
});

app.put('/api/users', (req, res) => {
  if (req.body.shippingAddress.length) {
    User.update(req.body, {
      where: { id: req.body.id },
      fields: ['phone', 'shippingAddress']
    })
      .then(() => res.sendStatus(200));
  } else {
    User.update(req.body, {
      where: { id: req.body.id },
      fields: ['creditCard']
    })
      .then(() =>
        User.findOne({ where: { id: req.body.id } })
      )
      .then(user => {
        res.send(user);
      })
  }
});

app.listen(3000, () => console.log(`Server is listening on port 3000`));
