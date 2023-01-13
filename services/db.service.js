const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://oren:oren@cluster0.ftmm9.mongodb.net/feel-good?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
	if (err) {
		console.error(err);
	} else {
		dbConn = client.db("feel-good")
		// const collection = client.db("feel-good").collection("users");
		// console.log("COLLECTION", dbConn);
		// client.close();
	}
});


const logger = require('./logger.service');
const config = require('../config');

module.exports = {
	getCollection
};

// Database Name
const dbName = 'feel-good';

let dbConn = null;




async function getCollection(collectionName) {
	// console.log("ASDFASDFASDF");
	try {

		
		const collection = await dbConn.collection(collectionName);
		// console.log("COLLECTION", collection);
		return collection;
	} catch (err) {
		logger.error('Failed to get Mongo collection', err);
		console.log(err);
	}
}

async function connect() {
	if (dbConn) return dbConn;
	try {
		// client.connect(err => {

		// 	const collection = client.db("feel-good").collection("users");
		// 	dbConn = db;
		
		// 	console.log("COLLECTION", collection, err);
		// 	// client.close();
		// });

		const client = await MongoClient.connect();
		const db = client.db(dbName);
		dbConn = db;
		return db;
	} catch (err) {
		logger.error('Cannot Connect to DB', err);
		throw err;
	}
}
