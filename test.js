const app = require('./app');
// const supertest = require('supertest');
const session = require('supertest-session');
// const should = require('should');

const beforeSession = session(app);

describe('accesssing error data', function() {
  it('test 404', (done) => {
    beforeSession
      .get('/nothing')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done()
      });
  });
  it('randomn access', (done) => {
    beforeSession
      .get('/groups/create')
      .expect(405, {status:'err', msg: 'not auth.'})
      .end((err, res) => {
        if (err) return done(err);
        done()
      });
  });

});

describe('test User Model', function() {
  it('register', function(done) {
    beforeSession
      .post('/users/register')
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

  it('login', function(done) {
    beforeSession
      .post('/users/login')
      .send({
        email: 'ciaranchen@gmail.com',
        password: 'ciaranchen'
      }).set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      })
    ;
  });
});



