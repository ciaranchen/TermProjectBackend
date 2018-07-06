const app = require('../../app');
const session = require('supertest-session');
const should = require('should');


describe('test User Model', function() {
  let request = session(app);
  // user id, group id, card id;
  let uid, gid, cid;

  it('register', function(done) {
    this.timeout(0);
    session(app)
      .post('/users/register')
      .send({
        email: 'ciaranchen@gmail.com',
        username: 'ciaran',
        password: 'ciaranchen'
      }).set('Accept', 'application/json')
      .expect(200, {status:'OK'})
      .end((err, res) => {
        console.log(res.body);
        done();
      });
  });

  it('login', function(done) {
    this.timeout(0);
    request
      .post('/users/login')
      .send({
        email: 'ciaranchen@gmail.com',
        password: 'ciaranchen',
      }).set('Accept', 'application/json')
      .expect(200, {status:'OK', res:'ciaran'})
      .end((err, res) => {
        if (err) return done(err);
        else {
          return done();
        }
      });
  });

  it('import csv', (done) => {
    this.timeout(0);
    request
      .post('/groups/import')
      .fieldname
      .attach('data', './temp.csv')
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        if (err) return done(err);
        else {
          return done();
        }
      });
  });

  // todo: further import correct;
  // todo: export data;

  it('delete user', (done) => {
    request
      .get('/users/delete_user')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        res.headers.location.should.equal('/users/logout');
        return done();
      });
  });
});