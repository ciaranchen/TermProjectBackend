const app = require('../../app');
// const supertest = require('supertest');
const session = require('supertest-session');
const should = require('should');

describe('accesssing error data', function() {
  let request;
  beforeEach(() => {
    request = session(app);
  });
  it('test 404', (done) => {
    request
      .get('/nothing')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        done()
      });
  });
  it('randomn access', (done) => {
    request
      .get('/groups/create')
      .expect(405, {status:'err', msg: 'not auth.'})
      .end((err, res) => {
        if (err) return done(err);
        done()
      });
  });
});

describe('prepare for next test', () => {
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
});


describe('test User Model', function() {
  let request = session(app);
  // group id, card id;
  let gid, cid;


  it('before login', (done) => {
    this.timeout(0);
    request
      .get('/users/testLogin')
      .expect(200, {status: 'OK', res: false})
      .end((err) => {
        if (err) return done(err);
        else return done();
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

  it('after login', function (done) {
    this.timeout(0);
    request
      .get('/users/testLogin')
      .expect(200, {status: 'OK', res: true})
      .end(done);
  });

  it('create groups', (done) => {
    this.timeout(0);
    request
      .get('/groups/create')
      .query({
        name: '1234567890',
        major: '英语'
      })
      .expect(200)
      .end((err, res) => {
        // console.log(res.body);
        res.body.status.should.equal('OK');
        gid = res.body.res;
        console.log(gid);
        if (err) return done(err);
        return done();
      });
  });

  it('change name of group', (done) => {
    this.timeout(0);
    request
      .get('/groups/update')
      .query({
        gid: gid,
        name: 'newname'
      })
      .expect(200, {status: 'OK'})
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('get all of groups', (done) => {
    this.timeout(0);
    request
      .get('/groups/getall')
      .expect(200)
      .end((err, res) => {
        // console.log(res.body);
        res.body.status.should.equal('OK');
        let docs = res.body.res;
        docs.length.should.equal(1);
        let doc = docs[0];
        doc.name.should.equal('newname');
        doc._id.should.equal(gid);
        doc.major.should.equal('英语');

        if (err) return done(err);
        return done();
      });
  });

  it('create card', (done) => {
    this.timeout(0);
    request
      .post('/cards/create')
      .query({gid: gid})
      .field('question', 'Answer to the Ultimate Question of Life, The Universe, and Everything?')
      .field('answer', '42')
      // about this file, please use 'cat test.png'
      .attach("photo", "./test.png")
      .expect(200)
      .end((err, res) => {
        console.log(res.body);
        res.body.status.should.equal('OK');
        cid = res.body.res;
        if (err) return done(err);
        return done();
      });
  });

  it('update card', (done) => {
    this.timeout(0);
    request
      .post('/cards/' + cid + '/update')
      .query({gid: gid})
      .send({
        answer: "42.This answer is from <<The Hitchhiker\'s Guide to the Galaxy>>"
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        return done();
      });
  });
  
  it('query card', (done) => {
    this.timeout(0);
    request
      .get('/cards')
      .query({gid: gid})
      .expect(200, { status: 'OK',
        res: [{
          group: gid,
          question: 'Answer to the Ultimate Question of Life, The Universe, and Everything?',
          answer: '42.This answer is from <<The Hitchhiker\'s Guide to the Galaxy>>'
        }]})
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('delete card', (done) => {
    this.timeout(0);
    request
      .get('/cards/' + cid + '/delete')
      .query({gid: gid})
      .expect(200, {status: "OK"})
      .end(done);
  });

  it('delete group', (done) => {
    this.timeout(0);
    request
      .get('/groups/delete')
      .query({
        gid: gid
      })
      .expect(200)
      .end((err, res) => {
        res.body.status.should.equal('OK');
        res.body.res.should.equal(gid);
        if (err) return done(err);
        return done();
      });
  });

  it('logout', (done) => {
    this.timeout(0);
    request
      .get('/users/logout')
      .expect(200, {status: "OK"})
      .end(done);
  });

  it('after logout', (done) => {
    this.timeout(0);
    request
      .get('/users/testLogin')
      .expect(200, {status: 'OK', res: false})
      .end(done);
  });
});

describe('after login', () => {
  let request = session(app);
  it('login(second time)', function(done) {
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
        else return done();
      });
  });

  it('delete user', (done) => {
    request
      .get('/users/delete_user')
      .expect(302)
      .end(done);
  });
});

after(() => {
  console.log('test finished.');
  process.exit(0);
});