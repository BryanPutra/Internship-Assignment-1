package com.tim7.eform.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tim7.eform.model.Product;

public interface ProductRepository extends MongoRepository<Product, String>{
	Optional<Product> findByProductCode(String productCode);
}
