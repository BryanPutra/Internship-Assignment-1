package com.tim7.eform.mongo;

import static com.mongodb.client.model.Filters.eq;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.mongodb.Mongo;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.tim7.eform.model.User;
import com.tim7.eform.repository.CustomUserRepository;
import com.tim7.eform.repository.UserRepository;

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
