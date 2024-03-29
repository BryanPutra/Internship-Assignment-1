package com.tim7.eform.mongo;

import static com.mongodb.client.model.Filters.eq;

import java.awt.Transparency;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.tim7.eform.model.EnumRole;
import com.tim7.eform.model.Role;
import com.tim7.eform.model.User;
import com.tim7.eform.repository.RoleRepository;
import com.tim7.eform.repository.UserRepository;;

public class MongoQuery {
	
	final String uri = "mongodb://localhost:27017";
	private static String fieldName = "";
	private static String filterVal = "";

	public Document getUser(String email, String cif, String ktpId) {
		Document doc;
		Map filter = filterSelection(email, cif, ktpId);
		fieldName = (String) filter.get("filterName");
		filterVal = (String) filter.get("value");
		
		try (MongoClient mongoClient = MongoClients.create(uri)) {
	        MongoDatabase database = mongoClient.getDatabase("eform_project");
	        MongoCollection<Document> collection = database.getCollection("users");
	        doc = collection.find(eq(fieldName, filterVal)).first();
	        mongoClient.close();
	    }
		return doc;
	}
	
	public Document getUserFormData(String email, String cif, String ktpId) {
		Document doc, userDoc;
		Map filter = filterSelection(email, cif, ktpId);
		fieldName = (String) filter.get("filterName");
		filterVal = (String) filter.get("value");
		
		try (MongoClient mongoClient = MongoClients.create(uri)){
			MongoDatabase database = mongoClient.getDatabase("eform_project");
			MongoCollection<Document> collection = database.getCollection("users");
			userDoc = collection.find(eq(fieldName, filterVal)).first();
			mongoClient.close();
		}
		doc = (Document) userDoc.get("formData");
		return doc;
	}
	
	public Document getCollectedData(String email, String cif, String ktpId) {
		Document returnDoc = new Document();
		Document doc = getUser(email, cif, ktpId);
		
		returnDoc.append("collectedData", doc.get("collectedData"));
		
		return returnDoc;
	}
	
	public void updateUser(String email, String cif, String ktpId, Document updatedDoc) {
		Map filter = filterSelection(email, cif, ktpId);
		fieldName = (String) filter.get("filterName");
		filterVal = (String) filter.get("value");
		
		try (MongoClient mongoClient = MongoClients.create(uri)) {
	        MongoDatabase database = mongoClient.getDatabase("eform_project");
	        MongoCollection<Document> collection = database.getCollection("users");
	        collection.replaceOne(eq(fieldName,filterVal), updatedDoc);
	        mongoClient.close();
	    }
	}
	
	public Set getRole() {
		Set roles = new HashSet<>();
		Document doc = new Document();
		try (MongoClient mongoClient = MongoClients.create(uri)) {
	        MongoDatabase database = mongoClient.getDatabase("eform_project");
	        MongoCollection<Document> collection = database.getCollection("roles");
	        doc = collection.find(eq("name", "ROLE_USER")).first();
	    }
		
		roles.add(doc);
		return roles;
	}
	
	//TODO: add line to append CIF Code
	public void insertNewUser(String email, String fullName, String password) {
		Document newUser = new Document();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		newUser.append("email", email);
		newUser.append("fullname", fullName);
		newUser.append("password", encoder.encode(password));
		newUser.append("roles", getRole());
		
		try (MongoClient mongoClient = MongoClients.create(uri)) {
	        MongoDatabase database = mongoClient.getDatabase("eform_project");
	        MongoCollection<Document> collection = database.getCollection("users");
	        collection.insertOne(newUser);
	        mongoClient.close();
	    }
	}
	
	public void insertNewUserWithCif(String email, String fullName, String cif, String password) {
		Document newUser = new Document();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Map formData = new HashMap();
		List collectedData = new LinkedList();
		
		newUser.append("cif", cif);
		newUser.append("email", email);
		newUser.append("fullname", fullName);
		newUser.append("password", encoder.encode(password));
		newUser.append("roles", getRole());		
		newUser.append("formData", formData);
		newUser.append("collectedData", collectedData);
		
		try (MongoClient mongoClient = MongoClients.create(uri)) {
	        MongoDatabase database = mongoClient.getDatabase("eform_project");
	        MongoCollection<Document> collection = database.getCollection("users");
	        collection.insertOne(newUser);
	        mongoClient.close();
	    }
	}
	
	
	
	
	
	public boolean exists(String email, String cif, String ktpId) {
		Document doc;
		Map filter = filterSelection(email, cif, ktpId);
		fieldName = (String) filter.get("filterName");
		filterVal = (String) filter.get("value");
		
		try (MongoClient mongoClient = MongoClients.create(uri)) {
	        MongoDatabase database = mongoClient.getDatabase("eform_project");
	        MongoCollection<Document> collection = database.getCollection("users");
	        doc = collection.find(eq(fieldName, filterVal)).first();
	        mongoClient.close();
	    }
		
		if(doc == null) {
			return false;
			
		}
		else {
			return true;
		}
	}
	
	public boolean existsByEmail(String email) {
		Document doc;
		
		try (MongoClient mongoClient = MongoClients.create(uri)) {
	        MongoDatabase database = mongoClient.getDatabase("eform_project");
	        MongoCollection<Document> collection = database.getCollection("users");
	        doc = collection.find(eq("email", email)).first();
	        mongoClient.close();
	    }
		
		if(doc == null) {
			return false;
			
		}
		else {
			return true;
		}
	}
	
	
	
	private Map filterSelection(String email, String cif, String ktpId) {
		Map filterMap = new HashMap();
		String filter;
		
		if(!email.isEmpty()) {
			filter  = email;
			filterMap.put("filterName", "email");
		}else if(!cif.isEmpty()) {
			filter = cif;
			filterMap.put("filterName", "cif");
		}else{
			filter = ktpId;
			filterMap.put("filterName", "ktpId");
		}
		filterMap.put("value",filter);
		return filterMap;
	}
}
