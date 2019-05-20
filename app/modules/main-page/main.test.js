const request = require('supertest');
const express = require('express');
const db = require('../../../config/db');
const MongoClient = require('mongodb').MongoClient;


describe("Main page testing", function() {
 
    it("Get response is 200", (done) => {		 
			request('http://localhost:8000').get('/').expect(200).end( (err, res)=> {
        if (err) return done(err);
        done();
  })
		})

/* 		it("database return objects", (done) => {
			let array = [];

});	 */
});