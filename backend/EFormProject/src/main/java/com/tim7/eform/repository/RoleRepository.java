package com.tim7.eform.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tim7.eform.model.EnumRole;
import com.tim7.eform.model.Role;

public interface RoleRepository extends MongoRepository<Role, String>{
	Optional<Role> findByName(EnumRole name);
}
