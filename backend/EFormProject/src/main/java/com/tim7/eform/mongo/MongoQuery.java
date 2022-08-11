package com.tim7.eform.mongo;

import static com.mongodb.client.model.Filters.eq;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
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
	@Autowired
	UserRepository repo;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	RoleRepository roleRepository;
	
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
	        System.out.println(doc.toJson());
	    }
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
	        collection.updateOne(eq(fieldName,filterVal), updatedDoc);
	    }
	}
	
	public void insertNewUser(String email, String fullName, String password) {
		Set<Role> roles = new HashSet<>();
		
		User newUser = new User(
	    		fullName,
	    		email,
	    		encoder.encode(password)
	    		);
		
		Role userRole = roleRepository.findByName(EnumRole.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		roles.add(userRole);
		newUser.setRoles(roles);
		
		repo.save(newUser);
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
