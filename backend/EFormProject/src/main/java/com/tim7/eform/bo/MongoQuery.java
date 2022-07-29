package com.tim7.eform.bo;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;

import com.tim7.eform.model.User;
import com.tim7.eform.repository.UserRepository;

public class MongoQuery {
	@Autowired
	private UserRepository repository;
	
	public Optional<User> getUser(@PathVariable String id){
		return repository.findById(id);
	}
}
