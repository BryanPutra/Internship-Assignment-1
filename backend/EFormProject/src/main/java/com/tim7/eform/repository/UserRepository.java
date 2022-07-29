package com.tim7.eform.repository;

import com.tim7.eform.model.User;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
	Optional<User> findByUsername(String username);
	
	Optional<User> findByEmail(String email);
	//Optional<User> findById(String id);
	@Query("{name:'?0'}")
    User findUserByEmail(String email);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
	
}