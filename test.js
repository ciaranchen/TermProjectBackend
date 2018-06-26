const app = require('./app');
const request = require('supertest');
const should = require('should');

describe('test global', function() {
  it('test 404', (done) => {
    request(app)
      .get('/nothing')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done()
      })
  });
});


describe('test User Model', function() {
  it('register', function(done) {
    request(app)
      .post('/users/login')
      .send({
        email: 'ciaranchen@gmail.com',
        username: 'ciaran',
        password: 'ciaranchen'
      }).set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});



