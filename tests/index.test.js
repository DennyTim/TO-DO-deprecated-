
const supertest = require("supertest");
const server = supertest.agent("http://localhost:8000");
const db = require('../config/db');
const MongoClient = require('mongodb').MongoClient;
 

describe("Main connections testing", function() {
 
    it("Server is live", (done) => {
        server.get('/')
            .expect(200, done)
		});
		
		it("Database connected", (done) => {
			MongoClient.connect(db.url, { useNewUrlParser: true }, (err, client) => {
				if (!err) {
					done();
				}
		});
	});
});