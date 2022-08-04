package com.tim7.eform.mongo;

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
import com.tim7.eform.model.User;
import com.tim7.eform.repository.CustomUserRepository;
import com.tim7.eform.repository.UserRepository;

@RestController
@RequestMapping(value="/api/form")
public class MongoQuery {
	
	@Autowired
	private CustomUserRepository repository;
	
	@GetMapping("/test")
	public void test() {
		String email = "bambangaja@gmail.com"; 
		Document doc = repository.findUser(email);
		
	}
}
