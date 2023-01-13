const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://roni:1234@cluster0.tgh0prx.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb+srv://oren:oren@cluster0.ftmm9.mongodb.net/admin?replicaSet=atlas-3sm9p7-shard-0&readPreference=primary&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
	if (err) {
		console.error(err);
	} else {
		const collection = client.db("feel-good").collection("users");
		console.log("COLLECTION", collection);
		client.close();
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
	console.log("ASDFASDFASDF");
	try {

		// const db = await connect();
		// const collection = await db.collection(collectionName);
		// console.log("COLLECTION", collection);
		// return collection;
	} catch (err) {
		logger.error('Failed to get Mongo collection', err);
		console.log(err);
	}
}

async function connect() {
	if (dbConn) return dbConn;
	try {
		client.connect(err => {

			const collection = client.db("feel-good").collection("users");
			// perform actions on the collection object
			// dbConn = db;
			console.log("COLLECTION", collection, err);
			// client.close();
		});

		// const client = await MongoClient.connect(config.dbURL);
		// const db = client.db(dbName);
		// dbConn = db;
		// return db;
	} catch (err) {
		logger.error('Cannot Connect to DB', err);
		throw err;
	}
}
