const request = require('supertest');
const expect = require('expect');

var { server } = require('../server.js');
const { Todo } = require('../models/todo');

var todo1 = new Todo({
  text: 'srikanth.s@motivitylabs.com'
});

var todo2 = new Todo({
  text: 'srisiro26.pec@gmail.com'
});

var todos = [todo1, todo2];

beforeEach(done => {
  Todo.remove({}).then(res => {
    Todo.insertMany(todos).then(
      res => {
        done();
      },
      err => {
        done(err);
      }
    );
  });
});

describe('POST /todos', () => {
  it('should create', done => {
    var text = 'srikanth';
    request(server)
      .post('/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ text })
      .expect(200)
      .expect(res => {
        // console.dir(res);
        expect(JSON.parse(res.text).text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);
        Todo.find()
          .then(res => {
            expect(res.length).toBe(3);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });

  //validation tests

  it('it should not create todos with invalid body data', done => {
    var text = '';
    request(server)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then(
          todos => {
            expect(todos.length).toBe(2);
            done();
          },
          err => {
            done(err);
          }
        );
      });
  });
});

describe('GET /todos', () => {
  it('Todos length must be 2', done => {
    request(server)
      .get('/todos')
      .expect(200)
      .end((err,res)=>{
		  if(err){
			  done(err);
		  }
		  const todos = JSON.parse(res.text);
		  expect(todos.length).toBe(2);
		  done();
	  })
  });
});
