var express = require('express');
var bodyParser = require('body-parser');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

//middleware used to populate req.body from the incoming request.
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo(req.body);
  todo.save().then(
    result => {
      res.send(JSON.stringify(result, undefined, 2));
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send(JSON.stringify(todos));
    },
    err => {
      res.status(200).send(err);
    }
  );
});

var server = app.listen(3000, (err, res) => {
  if (err) return console.log('server not started', err);
  console.log('server started at 3000', res);
});

var todo1 = new Todo({
  text: ''
});

// todo1.save().then(
//   res => {
// 	console.log('todo saved successfully', JSON.stringify(res, undefined, 2));
// 	throw new Error('srikanths error');
//   },
//   err => {
//     throw new Error(err);
//   }
// ).catch((err)=>{
// 	console.log("error",err);
// });

// var user1 = new User({
//   email: 'srinath.s@cts.com'
// });

// user1.save().then(
//   res => {
//     console.log('user saved successfully', res);
//   },
//   err => {
//     console.log('error in saving user', JSON.stringify(err, undefined, 2));
//   }
// );

module.exports = {
  app: app,
  server: server
};
