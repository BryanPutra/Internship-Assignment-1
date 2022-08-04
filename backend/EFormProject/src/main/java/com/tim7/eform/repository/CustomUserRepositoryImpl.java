package com.tim7.eform.repository;

import java.util.HashMap;
import java.util.Map;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.tim7.eform.model.User;

@Component
public class CustomUserRepositoryImpl implements CustomUserRepository{

	@Autowired
	MongoTemplate mongoTemplate;
	
	public Document findUser(String email) {
		Query query = new Query(Criteria.where("email").is(email));
		Document doc;
		doc = mongoTemplate.findOne(query, Document.class);
		return doc;
	}
	public void insertTest() {
		Map testMap = new HashMap();
		testMap.put("name", 001);
		mongoTemplate.insert(testMap);
	}
}
