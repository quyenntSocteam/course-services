const chai = require('chai');

const { MongoClient } = require('mongodb');

const should = chai.should();
const { expect } = chai;
const configDev = require('../../config/db_cloud').development;

describe('The DSN', () => {
  it('should be configured for development', async () => {
    expect(configDev.database.dsn).to.be.a('string');
  });
});

describe('The database', () => {
  it('development should be reachable', async () => {
    const db = await MongoClient.connect(configDev.database.dsn, { useNewUrlParser: true });
    expect(db).to.not.be.null;
    await db.close();
  });
});
