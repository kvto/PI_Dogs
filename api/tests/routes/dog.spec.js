/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const {getApiMainRout} = require('../../src/controllers/dogs')

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('POST /dogs', () =>{
    it('should return', () => {
      // console.log(expect(sum(3,5)));
      expect(getApiMainRout(infoDog)).toBe();
    });
  })
});
