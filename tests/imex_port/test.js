const app = require('../../app');
const session = require('supertest-session');
const should = require('should');


describe('test User Model', function() {
  let request = session(app);
  // group id
  let gid;

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
      .field('name', 'import_group')
      .field('major', '英语')
      .attach('data', './temp.csv')
      .expect(200)
      .end((err, res) => {
        gid = res.body.res;
        res.body.status.should.equal('OK');
        if (err) return done(err);
        return done();
      });
  });

  it('query card', (done) => {
    this.timeout(0);
    request
      .get('/cards')
      .query({gid: gid})
      .expect(200, {
        status: "OK",
        res: [{
          group: gid,
          question: 'qwerty',
          answer: '123456'
        }, {
          group: gid,
          question: 'asdfg',
          answer: 'zxcvb'
        }]
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('export csv', (done) => {
    this.timeout(0);
    request
      .get('/groups/export')
      .query({ gid: gid })
      .expect(200)
      .end(done);
  });

  it('delete group', (done) => {
    this.timeout(0);
    request
      .get('/groups/delete')
      .query({ gid: gid })
      .expect(200, {
        status: 'OK',
        res: gid
      })
      .end(done);
  });

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