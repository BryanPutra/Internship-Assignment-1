package com.tim7.eform.mongo;

import static com.mongodb.client.model.Filters.eq;
import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;


public class MongoQuery {
	String uri = "mongodb://localhost:27017";
	

	public void test() {
		String email = "bambangaja@gmail.com";
		try (MongoClient mongoClient = MongoClients.create(uri)) {
	        MongoDatabase database = mongoClient.getDatabase("eform_project");
	        MongoCollection<Document> collection = database.getCollection("users");
	        Document doc = collection.find(eq("email", email)).first();
	        System.out.println(doc.toJson());
	    }
	}
}
